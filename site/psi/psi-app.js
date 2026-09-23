/**
 * Gujarat Police PSI Preparation Engine - Main Application Coordinator
 * Namespaced cleanly under window.PSI_APP
 */
(function(root) {
  'use strict';

  var PSI_APP = {
    storage: null,
    bank: null,
    srs: null,
    engine: null,
    ui: null,
    isInitialized: false,

    init: function() {
      if (this.isInitialized) return;

      var mountPoint = document.getElementById('psi-root');
      if (!mountPoint) {
        console.warn('[PSI App] #psi-root container not found in DOM.');
        return;
      }

      this.storage = root.PSIStorage;
      this.bank = root.PSI_QUESTION_BANK;
      this.srs = root.PSISRS;
      this.config = root.PSI_EXAM_CONFIG;

      // Ensure any pending question datasets are flushed into the registry
      if (this.bank && typeof this.bank.flushPending === 'function') {
        this.bank.flushPending();
      }

      this.engine = new root.PSIQuestionEngine(this.bank, this.storage, this.srs, this.config);
      this.ui = new root.PSIUI(mountPoint, this.engine, this.storage, this.bank, this.srs, this.config);

      this.setupViewRouting();
      this.isInitialized = true;
      console.log('[PSI App] Initialized successfully with ' + this.bank.getAll().length + ' verified questions.');
    },

    /**
     * Toggles between the master CDS/CGL plan view and the mobile PSI Engine view
     */
    setupViewRouting: function() {
      var self = this;
      var dashboardWrap = document.querySelector('.wrap');
      var psiRoot = document.getElementById('psi-root');
      var navPsiBtn = document.getElementById('nav-psi-tab');

      function syncHash() {
        var hash = window.location.hash;
        if (hash === '#psi' || hash === '#psi-trainer') {
          self.showPsiView();
        } else {
          self.showDashboardView();
        }
      }

      if (navPsiBtn) {
        navPsiBtn.addEventListener('click', function(e) {
          e.preventDefault();
          window.location.hash = 'psi-trainer';
          self.showPsiView();
        });
      }

      var otherNavLinks = document.querySelectorAll('.nav-links a:not(#nav-psi-tab)');
      for (var i = 0; i < otherNavLinks.length; i++) {
        otherNavLinks[i].addEventListener('click', function() {
          self.showDashboardView();
        });
      }

      window.addEventListener('hashchange', syncHash);

      // Check on initial load if hash is set
      if (window.location.hash === '#psi' || window.location.hash === '#psi-trainer') {
        self.showPsiView();
      }
    },

    showPsiView: function() {
      var dashboardWrap = document.querySelector('.wrap');
      var psiRoot = document.getElementById('psi-root');
      var navPsiBtn = document.getElementById('nav-psi-tab');
      var savebar = document.querySelector('.savebar');

      if (dashboardWrap) dashboardWrap.style.display = 'none';
      if (savebar) savebar.style.display = 'none';
      if (psiRoot) psiRoot.style.display = 'block';
      if (navPsiBtn) {
        navPsiBtn.classList.add('active');
        navPsiBtn.style.color = 'var(--accent)';
        navPsiBtn.style.background = 'var(--accent-soft)';
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
    },

    showDashboardView: function() {
      if (this.ui && typeof this.ui.stopMetroTimer === 'function') {
        this.ui.stopMetroTimer();
      }
      var dashboardWrap = document.querySelector('.wrap');
      var psiRoot = document.getElementById('psi-root');
      var navPsiBtn = document.getElementById('nav-psi-tab');
      var savebar = document.querySelector('.savebar');

      if (dashboardWrap) dashboardWrap.style.display = 'block';
      if (savebar) savebar.style.display = '';
      if (psiRoot) psiRoot.style.display = 'none';
      if (navPsiBtn) {
        navPsiBtn.classList.remove('active');
        navPsiBtn.style.color = '';
        navPsiBtn.style.background = '';
      }
    }
  };

  root.PSI_APP = PSI_APP;

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { PSI_APP.init(); });
  } else {
    PSI_APP.init();
  }
})(typeof window !== 'undefined' ? window : this);
