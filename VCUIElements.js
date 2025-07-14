/**
 * UI Elements Module
 * Author: Thien Vu
 */
class UIElements_VaoCa {
  constructor() {
    this._injectStyles();
    this._createPopupContainers();
    this._createAlertContainer();
    this._createLoadingScreen();
    this._createFullscreenImageOverlay();
    this._setupGlobalImageClickListener();
  }

  _injectStyles() {
    const styleId = "vc-vu-ui-styles";
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
            .VC-Vu-component-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.2);
                backdrop-filter: blur(4px);
                -webkit-backdrop-filter: blur(2px);
                justify-content: center;
                display: flex;
                align-items: center;
                z-index: 9950;
                opacity: 0;
                pointer-events: none;
                transform: scale(0.95) translateY(10px);
                transition: all 0.3s ease;
            }

            .VC-Vu-component-overlay.active {
                opacity: 1;
                pointer-events: auto;
                transform: scale(1) translateY(0);
            }

            .VC-Vu-popup {
                width: 80%; 
                max-width: 450px; 
                min-width: 350px; 
                background-color: rgba(255, 255, 255, 1);
                border: 1px solid rgba(255, 255, 255, 1);
                border-radius: 32px;
                padding: 3rem 1.5rem;
                padding-bottom: 1.5rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                text-align: center;
                transition: transform 0.3s ease-out, opacity 0.3s ease-out;
                position: relative; 
                z-index: 9999;
            }


            .VC-Vu-popup .exitBtn {
                position: absolute;
                top: 20px;
                right: 20px;
                box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.08);
                background-color: rgb(255, 255, 255);
                border-radius: 50%;
                width: 40px;
                height: 40px;
                border: none;
                color: black;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0px !important;
            }

            .Vu-VC-popup-icon {
                transform: scale(1.2);
                margin-top: 10px;
                margin-bottom: 10px;
            }
            .Vu-VC-popup-icon svg {
                width: 80px; 
                height: auto;
                vertical-align: middle;
            }

            .VC-Vu-popup h2 {
                margin: 0 0 1rem;
                font-size: 1.2rem; 
                font-weight: bold;
                color: #004c39;
            }

            .VC-Vu-popup p {
                font-size: 0.7rem;
                margin-top: 2rem;
                margin-bottom: 0.5rem;
                line-height: 1.2;
            }

            .VC-Vu-popup-buttons {
                display: flex;
                justify-content: center; 
                gap: 20px;
                width: 100%;
                margin-top: 10px;
            }

            .VC-Vu-popup-buttons button {
                padding: 0.4rem 2rem;
                border: none;
                border-radius: 32px;
                cursor: pointer;
                font-weight: bold;
                width: 40%;
                transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
                font-size: 0.9rem;
            }

            .VC-Vu-btn-cancel {
                background-color: #E6F4F1;
                color: #004c39;
            }

            .VC-Vu-btn-ok {
                background-color: #004c39;
                color: white;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            }
            .VC-Vu-btn-ok:hover {
                background-color: #E6F4F1;
                color: #004c39;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            }

            /* NEW: Style for the third button */
            .VC-Vu-btn-third {
                background-color: #f0ad4e; /* Example color for a warning/neutral third option */
                color: white;
            }
            .VC-Vu-btn-third:hover {
                background-color: #ec971f;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            }

            /* Responsive adjustments for popups */
            @media (max-width: 768px) {
                .VC-Vu-popup-buttons button {
                    width: 100%;
                }
            }

            #vc-vu-alert-container {
                position: fixed;
                bottom: 80px;
                right: 10px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                z-index: 10000; 
                width: calc(100% - 20px);
            }

            .alertFastMessgeByVu {
                width: 80%;
                padding: 12px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: start;
                border-radius: 50px;
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
                position: relative;
                opacity: 0;
                transform: translateX(100%);
                animation: fadeInRight 0.3s ease-out forwards, fadeOut 0.5s ease-in forwards 4.5s;
                pointer-events: all; 
                backdrop-filter: blur(12px) brightness(1.2);
                --webkit-backdrop-filter: blur(12px);
            }

            @keyframes fadeInRight {
                from { opacity: 0; transform: translateX(100%); }
                to { opacity: 1; transform: translateX(0); }
            }

            @keyframes fadeOut {
                from { opacity: 1; transform: translateX(0); }
                to { opacity: 0; transform: translateX(100%); }
            }

            .alertFastMessgeByVu .iconAlert {
                width: 24px;
                height: 24px;
                margin-right: 10px;
                flex-shrink: 0; 
            }

            .alertFastMessgeByVu .iconAlert svg {
                width: 100%;
                height: 100%;
            }

            .alertFastMessgeByVu .iconAlert path {
                fill: #fff;
            }

            .alertFastMessgeByVu.error {
                background: rgba(209, 13, 13, 0.7);
                box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);;
            }

            .alertFastMessgeByVu.success {
                background: rgba(38, 155, 36, .7);
                box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
            }

            .alertFastMessgeByVu.notice {
                background: rgba(80, 154, 248, .7);
                box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
            }

            .alertFastMessgeByVu.warning {
                background-color: rgba(247, 199, 82, .7);
                box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
            }
            .alertFastMessgeByVu.warning .iconAlert path {
                fill: #333; 
            }
            .alertFastMessgeByVu.warning .alertMessage {
                color: #333;
            }

            .alertMessage {
                font-weight: 500;
                font-size: 0.8rem;
                color: #fff;
                flex-grow: 1;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            @media (max-width: 480px) {
                #vc-vu-alert-container {
                    bottom: 70px;
                    right: 10px;
                    left: 10px; 
                    align-items: center;
                }
                .alertFastMessgeByVu {
                    width: calc(100% - 20px); 
                }
            }

                .VC-Vu-component-loading {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    display: flex;
                    width: 190px;
                    height: 190px;
                    padding: 30px;
                    border-radius: 40px;
                    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
                    background-color: rgba(0, 0, 0, 0.6);
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    z-index: 9999;
                    backdrop-filter: blur(2px);
                    --webkit-backdrop-filter: blur(2px);
                    opacity: 0;
                    pointer-events: none;
                    transform: translate(-50%, -50%) scale(0.95) translateY(10px);
                    transition: all 0.3s ease;
                }

                 .VC-Vu-component-loading.active {
                      opacity: 1;
                      pointer-events: auto;
                      transform: translate(-50%, -50%) scale(1) translateY(0);
                  }

                .VC-Vu-component-loading .loadMessage {
                    color: #fff;
                    font-size: 0.6rem;
                    margin-top: 10px;
                    text-align: center;
                }

                 .loaderVu {
                    overflow: visible;
                    height: fit-content;
                    width: fit-content;
                    padding: 0px 20px;
                    padding-bottom: 0px;
                    display: flex;
                }

                .logoVu {
                    fill: none;
                    stroke-dasharray: 50px;
                    stroke-width: 0.5px;
                    stroke: #fff;
                    animation: load 3s infinite linear;
                }

                @keyframes load {
                    0% {
                        stroke-dashoffset: 0px;
                    }

                    100% {
                        stroke-dashoffset: 200px;
                    }
                }

                #fullscreenImageOverlay {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background-color: rgba(0, 0, 0, 0.9);
                  display: none;
                  justify-content: center;
                  align-items: center;
                  z-index: 2000;
                  animation: fadeIn 0.3s ease-out;
                   backdrop-filter: blur(2px) brightness(1.2);
                --webkit-backdrop-filter: blur(2px);
                }

                #fullscreenImageOverlay.active {
                    display: flex;
                }


                #fullscreenImage {
                  max-width: 95%;
                  max-height: 95%;
                  object-fit: contain;
                  cursor: pointer;
                  border-radius: 16px
                }

                #closeImageOverlay {
                  position: absolute;
                  top: 20px;
                  right: 20px;
                  background-color: rgba(255, 255, 255, 0.3);
                  color: white;
                  border: none;
                  border-radius: 60px;
                  width: 50px;
                  height: 50px;
                  cursor: pointer;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  z-index: 2001;
                  transition: background-color 0.2s;
                }

                #closeImageOverlay svg {
                  width: 40px;
                  height: 40px;
                }

                #closeImageOverlay:hover {
                  background-color: rgba(255, 255, 255, 0.5);
                }

                /* Keyframe cho hiệu ứng fadeIn */
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                  }

                  to {
                    opacity: 1;
                  }
                }

                #imageActionButtons {
                  position: absolute;
                  bottom: 20px;
                  left: 20px;
                  display: flex;
                  gap: 16px;
                  /* Space between buttons */
                  z-index: 2001;
                  border: 1px solid rgba(255, 255, 255, 0.4);
                  padding: 8px 12px;
                  border-radius: 30px;
                  height: 3.6rem;
                }

                .image-action-btn {
                  background-color: rgba(255, 255, 255, 0.2);
                  color: white;
                  border: none;
                  border-radius: 50%;
                  /* Circular buttons */
                  width: 36px;
                  height: 36px;
                  cursor: pointer;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  transition: background-color 0.2s;
                }

                .image-action-btn:hover {
                  background-color: rgba(255, 255, 255, 0.5);
                }

                .image-action-btn svg {
                  width: 20px;
                  /* Icon size */
                  height: 20px;
                  fill: white;
                }

                #fullscreenImageLogo {
                  position: absolute;
                  bottom: 20px;
                  right: 20px;
                  width: 80px;
                  /* Adjust as needed */
                  height: auto;
                  opacity: 0.7;
                  /* Make it slightly transparent */
                  z-index: 2001;

                }

                /* Keyframe cho hiệu ứng fadeIn */
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                  }

                  to {
                    opacity: 1;
                  }
                }

                #fullscreenLogoContainer {
                  position: absolute;
                  bottom: 20px;
                  right: 20px;
                  display: flex;
                  width: 40%;
                  border: 1px solid rgba(255, 255, 255, 0.4);
                  padding: 8px 10px;
                  /* Use flexbox for alignment */
                  align-items: center;
                  justify-content: space-around;
                  border-radius: 40px;
                  /* Vertically align items */
                  gap: 8px;
                  height: 3.6rem;
                  /* Space between logos and divider */
                  z-index: 2001;
                  background-color: rgba(255, 255, 255, 0.1);
                   backdrop-filter: blur(8px) brightness(1.2);
                --webkit-backdrop-filter: blur(8px);
                }

                /* NEW: Styles for individual Logos */
                .fullscreen-logo {
                  transform: scale(0.8);
                }

                /* NEW: Styles for the Divider */
                .fullscreen-logo-divider {
                  width: 1px;
                  /* Độ rộng của đường ngăn */
                  height: 40px;
                  /* Chiều cao của đường ngăn, có thể điều chỉnh */
                  background-color: rgba(255, 255, 255, 0.5);
                }
        `;
    document.head.appendChild(style);
  }

  /**
   * Creates and appends the main popup overlay elements to the body.
   */
  _createPopupContainers() {
    // Confirm Popup
    this.confirmPopupOverlay = document.createElement("div");
    this.confirmPopupOverlay.id = "vc-vu-confirm-popup";
    this.confirmPopupOverlay.classList.add("VC-Vu-component-overlay");
    this.confirmPopupOverlay.innerHTML = `
            <div class="VC-Vu-popup">
                <button class="exitBtn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
              </svg>
                </button>
                <h2 class="vc-popup-title"></h2>
                <div class="Vu-VC-popup-icon"></div>
                <p class="vc-popup-content"></p>
                <div class="VC-Vu-popup-buttons">
                    <button class="VC-Vu-btn-cancel vc-btn-cancel">Hủy</button>
                    <button class="VC-Vu-btn-ok vc-btn-ok">Đồng ý</button>
                </div>
            </div>
        `;
    document.body.appendChild(this.confirmPopupOverlay);
    this._setupConfirmPopupEvents(this.confirmPopupOverlay);

    // Success/Info Popup
    this.infoPopupOverlay = document.createElement("div");
    this.infoPopupOverlay.id = "vc-vu-info-popup";
    this.infoPopupOverlay.classList.add("VC-Vu-component-overlay");
    this.infoPopupOverlay.innerHTML = `
            <div class="VC-Vu-popup">
                <button class="exitBtn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
              </svg></button>
                <h2 class="vc-popup-title"></h2>
                <div class="Vu-VC-popup-icon"></div>
                <p class="vc-popup-content"></p>
                <div class="VC-Vu-popup-buttons">
                    <button class="VC-Vu-btn-ok vc-btn-ok">OK</button>
                </div>
            </div>
        `;
    document.body.appendChild(this.infoPopupOverlay);
    this._setupInfoPopupEvents(this.infoPopupOverlay);

    // NEW: Three Option Popup Container
    this.threeOptionPopupOverlay = document.createElement("div");
    this.threeOptionPopupOverlay.id = "vc-vu-three-option-popup";
    this.threeOptionPopupOverlay.classList.add("VC-Vu-component-overlay");
    this.threeOptionPopupOverlay.innerHTML = `
            <div class="VC-Vu-popup">
                <button class="exitBtn">×</button>
                <h2 class="vc-popup-title"></h2>
                <div class="Vu-VC-popup-icon"></div>
                <p class="vc-popup-content"></p>
                <div class="VC-Vu-popup-buttons">
                    <button class="VC-Vu-btn-cancel vc-btn-cancel"></button>
                    <button class="VC-Vu-btn-third vc-btn-third"></button>
                    <button class="VC-Vu-btn-ok vc-btn-ok"></button>
                </div>
            </div>
        `;
    document.body.appendChild(this.threeOptionPopupOverlay);
    this._setupThreeOptionPopupEvents(this.threeOptionPopupOverlay);
  }

  _createFullscreenImageOverlay() {
    this.fullscreenImageOverlay = document.createElement("div");
    this.fullscreenImageOverlay.id = "fullscreenImageOverlay";
    this.fullscreenImageOverlay.innerHTML = `
  <img id="fullscreenImage" src="" alt="Full Screen Image">

  <button id="closeImageOverlay">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 18L18 6M6 6l12 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
  <div id="imageActionButtons">
    <button id="saveImageBtn" class="image-action-btn" title="Lưu ảnh">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
      </svg>
    </button>
    <button id="copyImageBtn" class="image-action-btn" title="Sao chép ảnh">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
      </svg>
    </button>
    <button id="shareImageBtn" class="image-action-btn" title="Chia sẻ ảnh">
      <svg height="18" width="18" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" class="icon">
        <path fill="#ffffff"
          d="M767.99994 585.142857q75.995429 0 129.462857 53.394286t53.394286 129.462857-53.394286 129.462857-129.462857 53.394286-129.462857-53.394286-53.394286-129.462857q0-6.875429 1.170286-19.456l-205.677714-102.838857q-52.589714 49.152-124.562286 49.152-75.995429 0-129.462857-53.394286t-53.394286-129.462857 53.394286-129.462857 129.462857-53.394286q71.972571 0 124.562286 49.152l205.677714-102.838857q-1.170286-12.580571-1.170286-19.456 0-75.995429 53.394286-129.462857t129.462857-53.394286 129.462857 53.394286 53.394286 129.462857-53.394286 129.462857-129.462857 53.394286q-71.972571 0-124.562286-49.152l-205.677714 102.838857q1.170286 12.580571 1.170286 19.456t-1.170286 19.456l205.677714 102.838857q52.589714-49.152 124.562286-49.152z">
        </path>
      </svg>
    </button>
  </div>
  <div id="fullscreenLogoContainer">
    <svg id="fullscreenLogo1" class="fullscreen-logo" width="171" height="44" viewBox="0 0 171 44" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <mask id="path-1-inside-1_1493_14" fill="white">
        <path
          d="M13.3823 40.566C11.8443 38.1332 10.3351 35.4107 8.85472 32.3988C7.39361 29.3674 6.06705 26.2589 4.87509 23.0731C3.68313 19.868 2.73146 16.7885 2.02013 13.8344C1.30879 10.861 0.953125 8.20617 0.953125 5.86994C0.953125 5.36793 1.05886 4.97213 1.27034 4.68252C1.71252 4.06466 2.25083 3.42751 2.88526 2.77107C3.53893 2.09529 4.30793 1.39056 5.19231 0.656865C5.48068 0.425171 5.74984 0.309326 5.99978 0.309326C6.2497 0.309326 6.49962 0.425171 6.74957 0.656865C7.65316 1.39056 8.42215 2.09529 9.05659 2.77107C9.69105 3.42751 10.2293 4.06466 10.6715 4.68252C10.883 4.97213 10.9888 5.3969 10.9888 5.95682V5.84097C10.9888 7.48214 11.2098 9.46118 11.652 11.7781C12.1134 14.0757 12.7382 16.4989 13.5265 19.0475C14.334 21.5768 15.2472 24.0385 16.2661 26.4327C17.3042 28.8075 18.4097 30.8832 19.5824 32.6595H19.7555C21.0436 30.8832 22.2067 28.8172 23.2449 26.4616C24.3023 24.0868 25.2059 21.6347 25.9557 19.1054C26.7247 16.5761 27.311 14.1626 27.7148 11.865C28.1377 9.54806 28.3492 7.54973 28.3492 5.86994V5.95682C28.3492 5.3969 28.4453 4.97213 28.6376 4.68252C29.5604 3.40822 30.8294 2.06633 32.4442 0.656865C32.7519 0.425171 33.0208 0.309326 33.2518 0.309326C33.4632 0.309326 33.7131 0.425171 34.0015 0.656865C34.8666 1.39056 35.6067 2.09529 36.2219 2.77107C36.837 3.42751 37.3658 4.06466 37.8081 4.68252C38.0002 4.99145 38.0966 5.40655 38.0966 5.92788C38.0966 7.68487 37.8467 9.72184 37.3465 12.0388C36.866 14.3364 36.2026 16.7692 35.3568 19.3371C34.511 21.905 33.5496 24.4729 32.4731 27.0409C31.3964 29.6088 30.2621 32.0607 29.0702 34.3971C27.8782 36.714 26.6862 38.7703 25.4943 40.566C24.4945 42.0912 23.1295 42.8539 21.3993 42.8539H17.4196C15.6893 42.8539 14.3436 42.0912 13.3823 40.566ZM0.953125 5.84097V5.86994V5.95682V5.84097ZM38.0966 5.86994V5.95682V5.92788V5.86994ZM49.3432 43.5778C46.517 43.5778 44.2678 42.7865 42.5951 41.2031C40.9417 39.6004 40.1152 37.3996 40.1152 34.6C40.1152 33.1518 40.3747 31.8097 40.8939 30.5742C41.4319 29.3192 42.3548 28.2186 43.6622 27.2726C44.9886 26.3072 46.8344 25.5349 49.199 24.9556C51.5831 24.3764 54.6207 24.0385 58.312 23.942C58.312 22.185 57.8696 20.9203 56.9853 20.148C56.1202 19.3757 54.8128 18.9895 53.0634 18.9895C51.4868 18.9895 50.1989 19.2599 49.199 19.8005C48.1993 20.3411 47.5745 20.7079 47.3246 20.901C47.0554 21.1327 46.7287 21.2196 46.3442 21.1617C45.8251 21.0844 45.2674 20.9493 44.6715 20.7562C44.0946 20.5631 43.4698 20.3411 42.7971 20.0901C42.7008 20.0515 42.5951 19.9935 42.4798 19.9163C42.3645 19.8198 42.2973 19.6846 42.278 19.5109C42.278 19.4143 42.2877 19.2985 42.3069 19.1633C42.3259 19.0088 42.3741 18.7386 42.4509 18.3524C42.528 17.9662 42.6433 17.4932 42.7971 16.9333C42.9507 16.354 43.0949 15.91 43.2295 15.601C43.4027 15.2728 43.6911 14.9639 44.0946 14.6743C44.4216 14.404 45.4117 13.9696 47.065 13.371C48.7184 12.7725 51.1119 12.4732 54.2458 12.4732C62.8779 12.4732 67.194 16.6919 67.194 25.1294V41.5215C67.194 41.8886 67.0883 42.2071 66.8766 42.4774C66.6845 42.7284 66.3482 42.8539 65.8673 42.8539H61.5416C61.2342 42.8539 60.9554 42.8152 60.7054 42.7381C60.4748 42.6416 60.2538 42.4677 60.0421 42.2167L58.2541 39.8998H58.0524C57.1681 41.1934 55.976 42.13 54.4765 42.709C52.9962 43.2884 51.285 43.5778 49.3432 43.5778ZM52.5154 36.8589C54.2841 36.8589 55.6204 36.405 56.524 35.4978C57.4276 34.5903 58.0042 33.6538 58.2541 32.6885V29.4736C55.5818 29.4736 53.5728 29.686 52.2272 30.1108C50.9005 30.5164 50.0162 31.0568 49.5738 31.7326C49.1318 32.3891 48.9108 33.1034 48.9108 33.8757C48.9108 34.9955 49.2568 35.7775 49.9487 36.2217C50.641 36.6466 51.4964 36.8589 52.5154 36.8589ZM125.706 35.7585C127.11 35.7585 128.206 35.6136 128.994 35.3239C129.801 35.0342 130.426 34.6771 130.868 34.2522C131.31 33.8277 131.695 33.4028 132.022 32.9779C132.329 32.5917 132.579 32.3024 132.772 32.1091C132.983 31.9162 133.271 31.781 133.637 31.7036C133.944 31.6071 134.435 31.5491 135.107 31.53C135.8 31.4913 136.482 31.472 137.155 31.472C137.847 31.472 138.328 31.4913 138.597 31.53C139.001 31.5491 139.279 31.6265 139.433 31.7617C139.587 31.8968 139.683 32.1862 139.721 32.6305C139.779 33.2483 139.808 33.9819 139.808 34.8316C139.827 35.681 139.818 36.4146 139.779 37.0328C139.76 37.2257 139.721 37.3899 139.664 37.5251C139.625 37.6602 139.529 37.8628 139.375 38.1332C139.183 38.4422 138.808 38.8958 138.251 39.4943C137.693 40.0737 136.876 40.6818 135.8 41.3189C134.723 41.9367 133.329 42.4677 131.618 42.912C129.926 43.3559 127.84 43.5778 125.36 43.5778C122.707 43.5778 120.227 43.24 117.92 42.5642C115.613 41.8693 113.585 40.7108 111.835 39.0887C110.105 37.467 108.75 35.2755 107.769 32.5146C106.808 29.7536 106.327 26.3072 106.327 22.1753C106.327 17.5801 107.115 13.6799 108.692 10.4748C110.287 7.25044 112.547 4.79837 115.469 3.11859C118.391 1.43883 121.852 0.598941 125.85 0.598941C128.657 0.598941 130.907 0.888558 132.598 1.46779C134.31 2.04702 135.607 2.73246 136.492 3.52407C137.376 4.29636 138.001 4.97213 138.366 5.55137C138.501 5.76377 138.597 5.95682 138.655 6.13061C138.712 6.28507 138.751 6.53606 138.77 6.88361C138.827 7.347 138.837 8.02277 138.799 8.91091C138.78 9.79908 138.712 10.581 138.597 11.2568C138.52 11.6816 138.395 11.9615 138.222 12.0967C138.145 12.1739 138.011 12.2415 137.818 12.2994C137.626 12.3574 137.338 12.3863 136.953 12.3863C136.338 12.3863 135.646 12.367 134.877 12.3284C134.108 12.2704 133.531 12.2125 133.147 12.1546C132.685 12.0774 132.349 11.9712 132.137 11.836C131.926 11.6816 131.714 11.4499 131.503 11.141C131.156 10.639 130.561 10.0597 129.715 9.40327C128.869 8.7468 127.475 8.41857 125.533 8.41857C122.803 8.41857 120.554 9.4805 118.785 11.6044C117.017 13.7089 116.132 17.1264 116.132 21.8568C116.132 26.5678 117.055 30.0625 118.901 32.3408C120.765 34.619 123.034 35.7585 125.706 35.7585ZM153.102 43.5778C150.276 43.5778 148.027 42.7865 146.354 41.2031C144.701 39.6004 143.874 37.3996 143.874 34.6C143.874 33.1518 144.134 31.8097 144.653 30.5742C145.191 29.3192 146.114 28.2186 147.421 27.2726C148.748 26.3072 150.594 25.5349 152.958 24.9556C155.342 24.3764 158.38 24.0385 162.071 23.942C162.071 22.185 161.629 20.9203 160.744 20.148C159.879 19.3757 158.572 18.9895 156.822 18.9895C155.246 18.9895 153.958 19.2599 152.958 19.8005C151.958 20.3411 151.334 20.7079 151.084 20.901C150.815 21.1327 150.488 21.2196 150.103 21.1617C149.584 21.0844 149.027 20.9493 148.431 20.7562C147.854 20.5631 147.229 20.3411 146.556 20.0901C146.46 20.0515 146.354 19.9935 146.239 19.9163C146.124 19.8198 146.056 19.6846 146.037 19.5109C146.037 19.4143 146.047 19.2985 146.066 19.1633C146.085 19.0088 146.133 18.7386 146.21 18.3524C146.287 17.9662 146.402 17.4932 146.556 16.9333C146.71 16.354 146.854 15.91 146.989 15.601C147.162 15.2728 147.45 14.9639 147.854 14.6743C148.181 14.404 149.171 13.9696 150.824 13.371C152.478 12.7725 154.871 12.4732 158.005 12.4732C166.637 12.4732 170.953 16.6919 170.953 25.1294V41.5215C170.953 41.8886 170.847 42.2071 170.636 42.4774C170.444 42.7284 170.107 42.8539 169.626 42.8539H165.301C164.993 42.8539 164.715 42.8152 164.465 42.7381C164.234 42.6416 164.013 42.4677 163.801 42.2167L162.013 39.8998H161.812C160.927 41.1934 159.735 42.13 158.236 42.709C156.755 43.2884 155.044 43.5778 153.102 43.5778ZM156.274 36.8589C158.043 36.8589 159.379 36.405 160.283 35.4978C161.187 34.5903 161.763 33.6538 162.013 32.6885V29.4736C159.341 29.4736 157.332 29.686 155.986 30.1108C154.66 30.5164 153.775 31.0568 153.333 31.7326C152.891 32.3891 152.67 33.1034 152.67 33.8757C152.67 34.9955 153.016 35.7775 153.708 36.2217C154.4 36.6466 155.256 36.8589 156.274 36.8589Z" />
      </mask>
      <path
        d="M13.3823 40.566L15.0743 39.4996L15.0728 39.4972L13.3823 40.566ZM8.85472 32.3988L7.05308 33.2672L7.05642 33.2741L7.05981 33.281L8.85472 32.3988ZM4.87509 23.0731L3.00052 23.7703L3.00191 23.774L4.87509 23.0731ZM2.02013 13.8344L0.0750146 14.2997L0.0757049 14.3026L2.02013 13.8344ZM1.27034 4.68252L2.88554 5.86198L2.89118 5.85426L2.89674 5.84649L1.27034 4.68252ZM2.88526 2.77107L1.44773 1.38057L1.44714 1.38118L2.88526 2.77107ZM5.19231 0.656865L3.93963 -0.902237L3.9274 -0.892409L3.91532 -0.88239L5.19231 0.656865ZM6.74957 0.656865L5.38994 2.12363L5.438 2.16818L5.48887 2.20949L6.74957 0.656865ZM9.05659 2.77107L7.59846 4.13997L7.60841 4.15056L7.6185 4.161L9.05659 2.77107ZM10.6715 4.68252L9.04517 5.84653L9.0507 5.85426L9.05631 5.86194L10.6715 4.68252ZM11.652 11.7781L9.68749 12.1531L9.68929 12.1625L9.69118 12.1719L11.652 11.7781ZM13.5265 19.0475L11.6158 19.6384L11.6185 19.6471L11.6212 19.6557L13.5265 19.0475ZM16.2661 26.4327L14.4258 27.2159L14.4296 27.2249L14.4335 27.2338L16.2661 26.4327ZM19.5824 32.6595L17.9134 33.7614L18.5063 34.6595H19.5824V32.6595ZM19.7555 32.6595V34.6595H20.7757L21.3746 33.8336L19.7555 32.6595ZM23.2449 26.4616L21.4178 25.6481L21.4148 25.655L23.2449 26.4616ZM25.9557 19.1054L24.0421 18.5236L24.0381 18.537L25.9557 19.1054ZM27.7148 11.865L25.7473 11.5058L25.745 11.5188L27.7148 11.865ZM28.6376 4.68252L27.0177 3.50945L26.9939 3.54243L26.9713 3.57636L28.6376 4.68252ZM32.4442 0.656865L31.2412 -0.940909L31.1835 -0.897437L31.1291 -0.849911L32.4442 0.656865ZM34.0015 0.656865L35.2952 -0.868424L35.2748 -0.885705L35.254 -0.902435L34.0015 0.656865ZM36.2219 2.77107L34.7429 4.11739L34.7526 4.12809L34.7625 4.13865L36.2219 2.77107ZM37.8081 4.68252L39.5065 3.6264L39.4722 3.57117L39.4343 3.5183L37.8081 4.68252ZM37.3465 12.0388L35.3915 11.6168L35.3889 11.6293L37.3465 12.0388ZM32.4731 27.0409L34.3175 27.8143L34.3176 27.8141L32.4731 27.0409ZM29.0702 34.3971L30.8486 35.312L30.8517 35.306L29.0702 34.3971ZM25.4943 40.566L23.8279 39.4598L23.8215 39.4696L25.4943 40.566ZM42.5951 41.2031L41.2031 42.6391L41.2116 42.6474L41.2202 42.6556L42.5951 41.2031ZM40.8939 30.5742L39.0557 29.786L39.0528 29.7928L39.05 29.7995L40.8939 30.5742ZM43.6622 27.2726L44.8347 28.8928L44.8392 28.8896L43.6622 27.2726ZM49.199 24.9556L48.7268 23.0122L48.7231 23.0131L49.199 24.9556ZM58.312 23.942L58.3643 25.9413L60.312 25.8903V23.942H58.312ZM56.9853 20.148L55.6533 21.64L55.6615 21.6472L55.6697 21.6544L56.9853 20.148ZM49.199 19.8005L48.2478 18.0411L48.2476 18.0412L49.199 19.8005ZM47.3246 20.901L46.1018 19.3183L46.06 19.3507L46.0199 19.3852L47.3246 20.901ZM46.3442 21.1617L46.642 19.184L46.6385 19.1834L46.3442 21.1617ZM44.6715 20.7562L44.0368 22.6528L44.0459 22.6559L44.055 22.6588L44.6715 20.7562ZM42.7971 20.0901L42.0532 21.9466L42.0755 21.9555L42.098 21.9639L42.7971 20.0901ZM42.4798 19.9163L41.1961 21.45L41.2781 21.5186L41.3669 21.5781L42.4798 19.9163ZM42.278 19.5109H40.278V19.6214L40.2902 19.7313L42.278 19.5109ZM42.3069 19.1633L44.2869 19.4456L44.2897 19.4263L44.292 19.407L42.3069 19.1633ZM42.4509 18.3524L40.4896 17.9609L40.4893 17.9624L42.4509 18.3524ZM42.7971 16.9333L44.7257 17.4632L44.7281 17.4545L44.7304 17.4458L42.7971 16.9333ZM43.2295 15.601L41.4606 14.6679L41.4258 14.7338L41.396 14.8022L43.2295 15.601ZM44.0946 14.6743L45.2609 16.299L45.3163 16.2592L45.3688 16.2158L44.0946 14.6743ZM47.065 13.371L46.3842 11.4904L46.3842 11.4904L47.065 13.371ZM66.8766 42.4774L65.3019 41.2444L65.2951 41.2531L65.2884 41.2618L66.8766 42.4774ZM60.7054 42.7381L59.9338 44.5832L60.0232 44.6206L60.1158 44.6492L60.7054 42.7381ZM60.0421 42.2167L58.4587 43.4386L58.4853 43.473L58.5133 43.5062L60.0421 42.2167ZM58.2541 39.8998L59.8375 38.6779L59.237 37.8998H58.2541V39.8998ZM58.0524 39.8998V37.8998H56.997L56.4013 38.7711L58.0524 39.8998ZM54.4765 42.709L53.7559 40.8433L53.7475 40.8466L54.4765 42.709ZM56.524 35.4978L57.941 36.9092L57.9412 36.909L56.524 35.4978ZM58.2541 32.6885L60.1903 33.1898L60.2541 32.9432V32.6885H58.2541ZM58.2541 29.4736H60.2541V27.4736H58.2541V29.4736ZM52.2272 30.1108L52.8119 32.0234L52.8206 32.0208L52.8293 32.018L52.2272 30.1108ZM49.5738 31.7326L51.2329 32.8496L51.2401 32.8388L51.2473 32.8279L49.5738 31.7326ZM49.9487 36.2217L48.8682 37.9047L48.8853 37.9157L48.9025 37.9263L49.9487 36.2217ZM128.994 35.3239L128.318 33.4414L128.311 33.444L128.304 33.4467L128.994 35.3239ZM130.868 34.2522L129.483 32.8098L129.483 32.8098L130.868 34.2522ZM132.022 32.9779L130.457 31.7322L130.447 31.7451L130.437 31.7581L132.022 32.9779ZM132.772 32.1091L131.423 30.6319L131.388 30.6641L131.354 30.6979L132.772 32.1091ZM133.637 31.7036L134.051 33.6601L134.144 33.6404L134.235 33.612L133.637 31.7036ZM135.107 31.53L135.164 33.5292L135.191 33.5285L135.219 33.5269L135.107 31.53ZM138.597 31.53L138.312 33.5097L138.407 33.5233L138.503 33.5278L138.597 31.53ZM139.433 31.7617L138.112 33.2629L138.113 33.2642L139.433 31.7617ZM139.721 32.6305L137.729 32.8033L137.73 32.8168L139.721 32.6305ZM139.808 34.8316H137.808V34.8539L137.809 34.8762L139.808 34.8316ZM139.779 37.0328L141.769 37.2316L141.773 37.1939L141.775 37.1562L139.779 37.0328ZM139.664 37.5251L137.824 36.7421L137.775 36.8568L137.741 36.9766L139.664 37.5251ZM139.375 38.1332L141.073 39.1902L141.094 39.1567L141.114 39.1225L139.375 38.1332ZM138.251 39.4943L139.692 40.8812L139.703 40.8693L139.714 40.8573L138.251 39.4943ZM135.8 41.3189L136.795 43.0537L136.807 43.047L136.818 43.0402L135.8 41.3189ZM131.618 42.912L131.115 40.9761L131.111 40.9774L131.618 42.912ZM117.92 42.5642L117.343 44.4792L117.35 44.4814L117.358 44.4835L117.92 42.5642ZM111.835 39.0887L110.467 40.5479L110.475 40.5554L111.835 39.0887ZM107.769 32.5146L105.88 33.1722L105.884 33.1841L107.769 32.5146ZM108.692 10.4748L106.899 9.58782L106.897 9.59205L108.692 10.4748ZM115.469 3.11859L114.472 1.38464L114.472 1.38464L115.469 3.11859ZM132.598 1.46779L131.951 3.35999L131.957 3.3622L132.598 1.46779ZM136.492 3.52407L135.158 5.01426L135.167 5.02244L135.176 5.0305L136.492 3.52407ZM138.366 5.55137L136.674 6.61811L136.677 6.62188L138.366 5.55137ZM138.655 6.13061L136.757 6.76196L136.768 6.79539L136.78 6.82841L138.655 6.13061ZM138.77 6.88361L136.773 6.99434L136.777 7.06234L136.785 7.12991L138.77 6.88361ZM138.799 8.91091L136.8 8.82419L136.8 8.8462L136.799 8.86822L138.799 8.91091ZM138.597 11.2568L140.565 11.6125L140.567 11.6029L140.568 11.5933L138.597 11.2568ZM138.222 12.0967L136.991 10.5201L136.892 10.5975L136.804 10.6866L138.222 12.0967ZM137.818 12.2994L137.242 10.3843L137.241 10.3846L137.818 12.2994ZM134.877 12.3284L134.726 14.3227L134.751 14.3246L134.776 14.3259L134.877 12.3284ZM133.147 12.1546L132.816 14.1272L132.833 14.1299L132.849 14.1323L133.147 12.1546ZM132.137 11.836L130.958 13.4517L131.008 13.4879L131.06 13.521L132.137 11.836ZM131.503 11.141L133.153 10.0116L133.149 10.0053L131.503 11.141ZM129.715 9.40327L130.941 7.82329L130.941 7.8231L129.715 9.40327ZM118.785 11.6044L120.316 12.8911L120.322 12.8842L118.785 11.6044ZM118.901 32.3408L117.347 33.5998L117.353 33.6075L118.901 32.3408ZM146.354 41.2031L144.962 42.6391L144.971 42.6474L144.979 42.6556L146.354 41.2031ZM144.653 30.5742L142.815 29.7857L142.812 29.7928L142.809 29.7999L144.653 30.5742ZM147.421 27.2726L148.594 28.8928L148.598 28.8896L147.421 27.2726ZM152.958 24.9556L152.486 23.0122L152.482 23.0131L152.958 24.9556ZM162.071 23.942L162.123 25.9413L164.071 25.8903V23.942H162.071ZM160.744 20.148L159.412 21.64L159.421 21.6472L159.429 21.6544L160.744 20.148ZM152.958 19.8005L152.007 18.0412L152.007 18.0412L152.958 19.8005ZM151.084 20.901L149.861 19.3183L149.819 19.3507L149.779 19.3852L151.084 20.901ZM150.103 21.1617L150.401 19.184L150.398 19.1834L150.103 21.1617ZM148.431 20.7562L147.796 22.6528L147.805 22.6559L147.814 22.6588L148.431 20.7562ZM146.556 20.0901L145.81 21.9457L145.833 21.9552L145.857 21.964L146.556 20.0901ZM146.239 19.9163L144.955 21.45L145.037 21.5186L145.126 21.5781L146.239 19.9163ZM146.037 19.5109H144.037V19.6197L144.049 19.7278L146.037 19.5109ZM146.066 19.1633L148.046 19.4456L148.048 19.4283L148.05 19.4109L146.066 19.1633ZM146.21 18.3524L144.249 17.9609L144.248 17.9624L146.21 18.3524ZM146.556 16.9333L148.485 17.4622L148.487 17.4545L148.489 17.4467L146.556 16.9333ZM146.989 15.601L145.22 14.6679L145.185 14.7338L145.155 14.8022L146.989 15.601ZM147.854 14.6743L149.019 16.2994L149.075 16.2595L149.128 16.2158L147.854 14.6743ZM150.824 13.371L150.143 11.4904L150.143 11.4904L150.824 13.371ZM170.636 42.4774L169.061 41.2444L169.054 41.2531L169.048 41.2618L170.636 42.4774ZM164.465 42.7381L163.693 44.5832L163.782 44.6206L163.875 44.6492L164.465 42.7381ZM163.801 42.2167L162.218 43.4386L162.244 43.4724L162.271 43.5051L163.801 42.2167ZM162.013 39.8998L163.597 38.6779L162.996 37.8998H162.013V39.8998ZM161.812 39.8998V37.8998H160.756L160.16 38.7711L161.812 39.8998ZM158.236 42.709L157.515 40.8433L157.507 40.8466L158.236 42.709ZM160.283 35.4978L161.7 36.9092L161.7 36.909L160.283 35.4978ZM162.013 32.6885L163.949 33.1898L164.013 32.9432V32.6885H162.013ZM162.013 29.4736H164.013V27.4736H162.013V29.4736ZM155.986 30.1108L156.571 32.0234L156.579 32.0208L156.588 32.0181L155.986 30.1108ZM153.333 31.7326L154.992 32.8496L154.999 32.8388L155.006 32.8279L153.333 31.7326ZM153.708 36.2217L152.627 37.9047L152.644 37.9157L152.662 37.9263L153.708 36.2217ZM13.3823 40.566L15.0728 39.4972C13.5785 37.1336 12.1036 34.4747 10.6496 31.5166L8.85472 32.3988L7.05981 33.281C8.56659 36.3467 10.11 39.1327 11.6918 41.6347L13.3823 40.566ZM8.85472 32.3988L10.6564 31.5304C9.2219 28.5544 7.91917 25.5017 6.74827 22.3723L4.87509 23.0731L3.00191 23.774C4.21493 27.016 5.56531 30.1805 7.05308 33.2672L8.85472 32.3988ZM4.87509 23.0731L6.74966 22.376C5.58214 19.2366 4.65503 16.2337 3.96455 13.3662L2.02013 13.8344L0.0757049 14.3026C0.807877 17.3432 1.78413 20.4995 3.00053 23.7703L4.87509 23.0731ZM2.02013 13.8344L3.96524 13.369C3.27986 10.5042 2.95312 8.00994 2.95312 5.86994H0.953125H-1.04688C-1.04688 8.4024 -0.662277 11.2178 0.0750167 14.2997L2.02013 13.8344ZM0.953125 5.86994H2.95312C2.95312 5.81419 2.95609 5.77392 2.95922 5.74728C2.96235 5.72069 2.96537 5.71014 2.96467 5.71277C2.9639 5.71565 2.95913 5.73259 2.9466 5.75966C2.93389 5.78713 2.91428 5.82262 2.88554 5.86198L1.27034 4.68252L-0.344863 3.50307C-0.888704 4.24783 -1.04688 5.10887 -1.04688 5.86994H0.953125ZM1.27034 4.68252L2.89674 5.84649C3.27177 5.32247 3.74406 4.7604 4.32338 4.16097L2.88526 2.77107L1.44714 1.38118C0.75761 2.09463 0.153278 2.80686 -0.356059 3.51855L1.27034 4.68252ZM2.88526 2.77107L4.32279 4.16157C4.91605 3.54825 5.6293 2.89299 6.46929 2.19612L5.19231 0.656865L3.91532 -0.88239C2.98656 -0.111875 2.16181 0.642333 1.44773 1.38057L2.88526 2.77107ZM5.19231 0.656865L6.44499 2.21597C6.48344 2.18507 6.46913 2.20402 6.40113 2.23328C6.32847 2.26456 6.18945 2.30933 5.99978 2.30933V0.309326V-1.69067C5.1207 -1.69067 4.41891 -1.28732 3.93963 -0.902237L5.19231 0.656865ZM5.99978 0.309326V2.30933C5.58617 2.30933 5.37348 2.10838 5.38994 2.12363L6.74957 0.656865L8.1092 -0.809898C7.62576 -1.25803 6.91324 -1.69067 5.99978 -1.69067V0.309326ZM6.74957 0.656865L5.48887 2.20949C6.33939 2.90008 7.03885 3.54388 7.59846 4.13997L9.05659 2.77107L10.5147 1.40217C9.80546 0.646701 8.96693 -0.118969 8.01026 -0.895761L6.74957 0.656865ZM9.05659 2.77107L7.6185 4.161C8.19781 4.76039 8.67009 5.32246 9.04517 5.84653L10.6715 4.68252L12.2979 3.51851C11.7886 2.80687 11.1843 2.09464 10.4947 1.38114L9.05659 2.77107ZM10.6715 4.68252L9.05631 5.86194C8.97991 5.75731 8.96488 5.68617 8.96868 5.70143C8.9704 5.70835 8.97566 5.73196 8.98036 5.77577C8.98505 5.81948 8.98876 5.87914 8.98876 5.95682H10.9888H12.9888C12.9888 5.19484 12.8533 4.27899 12.2868 3.5031L10.6715 4.68252ZM10.9888 5.95682H12.9888V5.84097H10.9888H8.98876V5.95682H10.9888ZM10.9888 5.84097H8.98876C8.98876 7.64931 9.23098 9.76115 9.68749 12.1531L11.652 11.7781L13.6166 11.4032C13.1887 9.1612 12.9888 7.31497 12.9888 5.84097H10.9888ZM11.652 11.7781L9.69118 12.1719C10.1676 14.5444 10.8102 17.0337 11.6158 19.6384L13.5265 19.0475L15.4372 18.4565C14.6663 15.9641 14.0592 13.6071 13.6129 11.3844L11.652 11.7781ZM13.5265 19.0475L11.6212 19.6557C12.4472 22.2431 13.382 24.7633 14.4258 27.2159L16.2661 26.4327L18.1064 25.6495C17.1123 23.3137 16.2207 20.9104 15.4317 18.4392L13.5265 19.0475ZM16.2661 26.4327L14.4335 27.2338C15.508 29.6917 16.6658 31.8718 17.9134 33.7614L19.5824 32.6595L21.2515 31.5576C20.1536 29.8946 19.1005 27.9234 18.0986 25.6316L16.2661 26.4327ZM19.5824 32.6595V34.6595H19.7555V32.6595V30.6595H19.5824V32.6595ZM19.7555 32.6595L21.3746 33.8336C22.7587 31.9249 23.9893 29.7317 25.075 27.2682L23.2449 26.4616L21.4148 25.655C20.4241 27.9026 19.3285 29.8415 18.1364 31.4854L19.7555 32.6595ZM23.2449 26.4616L25.072 27.2751C26.1653 24.8195 27.099 22.2855 27.8732 19.6738L25.9557 19.1054L24.0381 18.537C23.3128 20.9839 22.4392 23.3541 21.4178 25.6481L23.2449 26.4616ZM25.9557 19.1054L27.8692 19.6872C28.6587 17.0905 29.2652 14.598 29.6846 12.2111L27.7148 11.865L25.745 11.5188C25.3569 13.7272 24.7907 16.0617 24.0422 18.5236L25.9557 19.1054ZM27.7148 11.865L29.6823 12.2241C30.1189 9.83198 30.3492 7.70737 30.3492 5.86994H28.3492H26.3492C26.3492 7.39209 26.1565 9.26413 25.7473 11.5058L27.7148 11.865ZM28.3492 5.86994H26.3492V5.95682H28.3492H30.3492V5.86994H28.3492ZM28.3492 5.95682H30.3492C30.3492 5.78555 30.3645 5.69298 30.372 5.65972C30.3795 5.62674 30.3713 5.68703 30.3038 5.78868L28.6376 4.68252L26.9713 3.57636C26.4656 4.33816 26.3492 5.22248 26.3492 5.95682H28.3492ZM28.6376 4.68252L30.2574 5.85559C31.0663 4.73872 32.2204 3.50692 33.7594 2.16364L32.4442 0.656865L31.1291 -0.849911C29.4384 0.625743 28.0546 2.07773 27.0177 3.50945L28.6376 4.68252ZM32.4442 0.656865L33.6472 2.25464C33.7113 2.20637 33.7172 2.21189 33.6676 2.23323C33.6171 2.25496 33.4708 2.30933 33.2518 2.30933V0.309326V-1.69067C32.3809 -1.69067 31.684 -1.2743 31.2412 -0.940909L32.4442 0.656865ZM33.2518 0.309326V2.30933C32.9929 2.30933 32.8186 2.23949 32.7566 2.21075C32.6943 2.18187 32.691 2.16951 32.7491 2.21616L34.0015 0.656865L35.254 -0.902435C34.8497 -1.22717 34.152 -1.69067 33.2518 -1.69067V0.309326ZM34.0015 0.656865L32.7079 2.18215C33.5223 2.8729 34.1974 3.51818 34.7429 4.11739L36.2219 2.77107L37.7009 1.42475C37.016 0.672399 36.2109 -0.091779 35.2952 -0.868424L34.0015 0.656865ZM36.2219 2.77107L34.7625 4.13865C35.3282 4.74232 35.7989 5.31181 36.1819 5.84675L37.8081 4.68252L39.4343 3.5183C38.9326 2.81752 38.3459 2.11271 37.6812 1.40349L36.2219 2.77107ZM37.8081 4.68252L36.1097 5.73865C36.072 5.67803 36.0693 5.64789 36.076 5.6771C36.0832 5.70825 36.0966 5.78706 36.0966 5.92788H38.0966H40.0966C40.0966 5.18537 39.963 4.36054 39.5065 3.6264L37.8081 4.68252ZM38.0966 5.92788H36.0966C36.0966 7.50373 35.8714 9.39397 35.3915 11.6168L37.3465 12.0388L39.3015 12.4608C39.822 10.0497 40.0966 7.86601 40.0966 5.92788H38.0966ZM37.3465 12.0388L35.3889 11.6293C34.9257 13.8438 34.2831 16.204 33.4572 18.7114L35.3568 19.3371L37.2564 19.9628C38.1221 17.3344 38.8062 14.829 39.3042 12.4482L37.3465 12.0388ZM35.3568 19.3371L33.4572 18.7114C32.6283 21.2279 31.6854 23.7466 30.6286 26.2677L32.4731 27.0409L34.3176 27.8141C35.4137 25.1993 36.3937 22.5822 37.2564 19.9628L35.3568 19.3371ZM32.4731 27.0409L30.6287 26.2675C29.57 28.7923 28.4566 31.1988 27.2886 33.4881L29.0702 34.3971L30.8517 35.306C32.0676 32.9226 33.2227 30.4253 34.3175 27.8143L32.4731 27.0409ZM29.0702 34.3971L27.2917 33.4821C26.1269 35.7464 24.9716 37.7369 23.828 39.4599L25.4943 40.566L27.1605 41.6721C28.4008 39.8037 29.6295 37.6817 30.8486 35.312L29.0702 34.3971ZM25.4943 40.566L23.8215 39.4696C23.1675 40.4674 22.4128 40.8539 21.3993 40.8539V42.8539V44.8539C23.8463 44.8539 25.8216 43.715 27.167 41.6623L25.4943 40.566ZM21.3993 42.8539V40.8539H17.4196V42.8539V44.8539H21.3993V42.8539ZM17.4196 42.8539V40.8539C16.4104 40.8539 15.688 40.4733 15.0743 39.4996L13.3823 40.566L11.6903 41.6323C12.9992 43.7092 14.9682 44.8539 17.4196 44.8539V42.8539ZM0.953125 5.84097H-1.04688V5.86994H0.953125H2.95312V5.84097H0.953125ZM0.953125 5.86994H-1.04688V5.95682H0.953125H2.95312V5.86994H0.953125ZM0.953125 5.95682H2.95312V5.84097H0.953125H-1.04688V5.95682H0.953125ZM38.0966 5.86994H36.0966V5.95682H38.0966H40.0966V5.86994H38.0966ZM38.0966 5.95682H40.0966V5.92788H38.0966H36.0966V5.95682H38.0966ZM38.0966 5.92788H40.0966V5.86994H38.0966H36.0966V5.92788H38.0966ZM49.3432 43.5778V41.5778C46.9059 41.5778 45.1909 40.9063 43.97 39.7507L42.5951 41.2031L41.2202 42.6556C43.3446 44.6666 46.1281 45.5778 49.3432 45.5778V43.5778ZM42.5951 41.2031L43.9871 39.7671C42.8039 38.6201 42.1152 36.9835 42.1152 34.6H40.1152H38.1152C38.1152 37.8157 39.0796 40.5807 41.2031 42.6391L42.5951 41.2031ZM40.1152 34.6H42.1152C42.1152 33.3962 42.3297 32.3199 42.7377 31.3488L40.8939 30.5742L39.05 29.7995C38.4197 31.2996 38.1152 32.9074 38.1152 34.6H40.1152ZM40.8939 30.5742L42.732 31.3623C43.1034 30.496 43.7665 29.6658 44.8347 28.8928L43.6622 27.2726L42.4897 25.6523C40.9431 26.7715 39.7604 28.1424 39.0557 29.786L40.8939 30.5742ZM43.6622 27.2726L44.8392 28.8896C45.8791 28.1327 47.4517 27.4428 49.6748 26.8982L49.199 24.9556L48.7231 23.0131C46.2171 23.6269 44.0981 24.4817 42.4853 25.6555L43.6622 27.2726ZM49.199 24.9556L49.6711 26.8991C51.8674 26.3655 54.7512 26.0358 58.3643 25.9413L58.312 23.942L58.2597 21.9426C54.4902 22.0412 51.2988 22.3873 48.7268 23.0122L49.199 24.9556ZM58.312 23.942H60.312C60.312 21.8971 59.7988 19.9498 58.3009 18.6416L56.9853 20.148L55.6697 21.6544C55.9404 21.8908 56.312 22.4728 56.312 23.942H58.312ZM56.9853 20.148L58.3172 18.656C56.9381 17.4248 55.0617 16.9895 53.0634 16.9895V18.9895V20.9895C54.5638 20.9895 55.3023 21.3266 55.6533 21.64L56.9853 20.148ZM53.0634 18.9895V16.9895C51.2764 16.9895 49.631 17.2933 48.2478 18.0411L49.199 19.8005L50.1501 21.5598C50.7669 21.2264 51.6972 20.9895 53.0634 20.9895V18.9895ZM49.199 19.8005L48.2476 18.0412C47.2912 18.5585 46.5069 19.0053 46.1018 19.3183L47.3246 20.901L48.5473 22.4837C48.5432 22.4869 48.5737 22.4637 48.6606 22.4081C48.7417 22.3561 48.8513 22.2891 48.9933 22.2057C49.2775 22.0389 49.661 21.8243 50.1504 21.5597L49.199 19.8005ZM47.3246 20.901L46.0199 19.3852C46.1022 19.3143 46.2206 19.2451 46.3637 19.2071C46.5018 19.1704 46.6038 19.1782 46.642 19.184L46.3442 21.1617L46.0463 23.1394C46.9453 23.2748 47.8736 23.0673 48.6293 22.4168L47.3246 20.901ZM46.3442 21.1617L46.6385 19.1834C46.2471 19.1252 45.7981 19.0189 45.288 18.8536L44.6715 20.7562L44.055 22.6588C44.7367 22.8797 45.403 23.0437 46.0499 23.1399L46.3442 21.1617ZM44.6715 20.7562L45.3063 18.8596C44.7544 18.6749 44.1513 18.4607 43.4963 18.2163L42.7971 20.0901L42.098 21.9639C42.7883 22.2215 43.4348 22.4514 44.0368 22.6528L44.6715 20.7562ZM42.7971 20.0901L43.5411 18.2336C43.5781 18.2485 43.6003 18.2602 43.6064 18.2636C43.6128 18.2671 43.6084 18.2651 43.5927 18.2545L42.4798 19.9163L41.3669 21.5781C41.561 21.7081 41.7917 21.8418 42.0532 21.9466L42.7971 20.0901ZM42.4798 19.9163L43.7635 18.3826C43.9184 18.5123 44.045 18.6737 44.1336 18.8519C44.2198 19.025 44.2537 19.1806 44.2659 19.2904L42.278 19.5109L40.2902 19.7313C40.3562 20.3263 40.6207 20.9684 41.1961 21.45L42.4798 19.9163ZM42.278 19.5109H44.278C44.278 19.5277 44.2773 19.5308 44.2784 19.5174C44.2795 19.5044 44.2819 19.481 44.2869 19.4456L42.3069 19.1633L40.327 18.881C40.2994 19.0747 40.278 19.2901 40.278 19.5109H42.278ZM42.3069 19.1633L44.292 19.407C44.3008 19.3358 44.3347 19.1334 44.4125 18.7424L42.4509 18.3524L40.4893 17.9624C40.4135 18.3437 40.351 18.6819 40.3219 18.9196L42.3069 19.1633ZM42.4509 18.3524L44.4122 18.7439C44.4768 18.4201 44.5792 17.9962 44.7257 17.4632L42.7971 16.9333L40.8686 16.4033C40.7074 16.9902 40.5791 17.5124 40.4896 17.9609L42.4509 18.3524ZM42.7971 16.9333L44.7304 17.4458C44.8745 16.9022 44.9883 16.5714 45.0631 16.3999L43.2295 15.601L41.396 14.8022C41.2015 15.2485 41.0269 15.8059 40.8639 16.4208L42.7971 16.9333ZM43.2295 15.601L44.9985 16.5342C44.9865 16.5569 45.0275 16.4665 45.2609 16.299L44.0946 14.6743L42.9283 13.0495C42.3547 13.4613 41.8189 13.9887 41.4606 14.6679L43.2295 15.601ZM44.0946 14.6743L45.3688 16.2158C45.2989 16.2736 45.2864 16.2692 45.4077 16.2042C45.5114 16.1487 45.667 16.0733 45.886 15.9772C46.3237 15.7851 46.9385 15.5438 47.7458 15.2515L47.065 13.371L46.3842 11.4904C45.5382 11.7967 44.8312 12.0719 44.2789 12.3143C43.7967 12.5258 43.2252 12.7981 42.8204 13.1327L44.0946 14.6743ZM47.065 13.371L47.7458 15.2516C49.0731 14.7711 51.1919 14.4732 54.2458 14.4732V12.4732V10.4732C51.0319 10.4732 48.3637 10.7738 46.3842 11.4904L47.065 13.371ZM54.2458 12.4732V14.4732C58.2649 14.4732 60.9097 15.4554 62.5589 17.0675C64.1998 18.6713 65.194 21.2307 65.194 25.1294H67.194H69.194C69.194 20.5907 68.0302 16.8219 65.3549 14.207C62.6881 11.6003 58.8589 10.4732 54.2458 10.4732V12.4732ZM67.194 25.1294H65.194V41.5215H67.194H69.194V25.1294H67.194ZM67.194 41.5215H65.194C65.194 41.511 65.1959 41.4678 65.2166 41.4056C65.2377 41.3418 65.2694 41.2859 65.3019 41.2444L66.8766 42.4774L68.4513 43.7104C68.9584 43.0628 69.194 42.3023 69.194 41.5215H67.194ZM66.8766 42.4774L65.2884 41.2618C65.4508 41.0496 65.6461 40.9363 65.7812 40.8859C65.8982 40.8423 65.9451 40.8539 65.8673 40.8539V42.8539V44.8539C66.6377 44.8539 67.7296 44.6535 68.4648 43.693L66.8766 42.4774ZM65.8673 42.8539V40.8539H61.5416V42.8539V44.8539H65.8673V42.8539ZM61.5416 42.8539V40.8539C61.4006 40.8539 61.3245 40.836 61.2951 40.827L60.7054 42.7381L60.1158 44.6492C60.5862 44.7943 61.0677 44.8539 61.5416 44.8539V42.8539ZM60.7054 42.7381L61.4771 40.8929C61.5477 40.9224 61.5891 40.9523 61.6027 40.963C61.6153 40.973 61.6034 40.9658 61.571 40.9273L60.0421 42.2167L58.5133 43.5062C58.8671 43.9257 59.3322 44.3316 59.9338 44.5832L60.7054 42.7381ZM60.0421 42.2167L61.6255 40.9949L59.8375 38.6779L58.2541 39.8998L56.6708 41.1216L58.4587 43.4386L60.0421 42.2167ZM58.2541 39.8998V37.8998H58.0524V39.8998V41.8998H58.2541V39.8998ZM58.0524 39.8998L56.4013 38.7711C55.7516 39.7215 54.8882 40.4061 53.756 40.8433L54.4765 42.709L55.197 44.5747C57.0638 43.8538 58.5845 42.6653 59.7035 41.0285L58.0524 39.8998ZM54.4765 42.709L53.7475 40.8466C52.5449 41.3173 51.0895 41.5778 49.3432 41.5778V43.5778V45.5778C51.4806 45.5778 53.4475 45.2595 55.2054 44.5714L54.4765 42.709ZM52.5154 36.8589V38.8589C54.6092 38.8589 56.5378 38.3179 57.941 36.9092L56.524 35.4978L55.107 34.0864C54.7029 34.492 53.9589 34.8589 52.5154 34.8589V36.8589ZM56.524 35.4978L57.9412 36.909C59.0259 35.8197 59.8294 34.5835 60.1903 33.1898L58.2541 32.6885L56.318 32.1872C56.179 32.724 55.8293 33.3609 55.1067 34.0866L56.524 35.4978ZM58.2541 32.6885H60.2541V29.4736H58.2541H56.2541V32.6885H58.2541ZM58.2541 29.4736V27.4736C55.5256 27.4736 53.269 27.6846 51.6251 28.2036L52.2272 30.1108L52.8293 32.018C53.8767 31.6874 55.638 31.4736 58.2541 31.4736V29.4736ZM52.2272 30.1108L51.6425 28.1982C50.1608 28.6512 48.7273 29.374 47.9004 30.6374L49.5738 31.7326L51.2473 32.8279C51.3051 32.7396 51.6402 32.3816 52.8119 32.0234L52.2272 30.1108ZM49.5738 31.7326L47.9148 30.6156C47.2564 31.5935 46.9108 32.695 46.9108 33.8757H48.9108H50.9108C50.9108 33.5118 51.0072 33.1848 51.2329 32.8496L49.5738 31.7326ZM48.9108 33.8757H46.9108C46.9108 35.4036 47.4063 36.9662 48.8682 37.9047L49.9487 36.2217L51.0292 34.5387C51.0266 34.537 51.0204 34.5407 50.9993 34.4929C50.9682 34.4226 50.9108 34.2392 50.9108 33.8757H48.9108ZM49.9487 36.2217L48.9025 37.9263C49.9807 38.588 51.2206 38.8589 52.5154 38.8589V36.8589V34.8589C51.7723 34.8589 51.3012 34.7052 50.9949 34.5172L49.9487 36.2217ZM125.706 35.7585V37.7585C127.209 37.7585 128.575 37.6086 129.684 37.2011L128.994 35.3239L128.304 33.4467C127.836 33.6186 127.011 33.7585 125.706 33.7585V35.7585ZM128.994 35.3239L129.669 37.2064C130.643 36.8571 131.544 36.3761 132.254 35.6946L130.868 34.2522L129.483 32.8098C129.308 32.9781 128.96 33.2113 128.318 33.4414L128.994 35.3239ZM130.868 34.2522L132.254 35.6946C132.758 35.2104 133.211 34.7118 133.607 34.1978L132.022 32.9779L130.437 31.7581C130.179 32.0938 129.863 32.445 129.483 32.8098L130.868 34.2522ZM132.022 32.9779L133.587 34.2236C133.878 33.8577 134.074 33.6356 134.189 33.5203L132.772 32.1091L131.354 30.6979C131.084 30.9691 130.781 31.3258 130.457 31.7322L132.022 32.9779ZM132.772 32.1091L134.12 33.5863C134.061 33.64 134.013 33.6657 133.995 33.674C133.979 33.6814 133.994 33.6724 134.051 33.6601L133.637 31.7036L133.222 29.7471C132.612 29.8763 131.966 30.1363 131.423 30.6319L132.772 32.1091ZM133.637 31.7036L134.235 33.612C134.226 33.6149 134.291 33.5951 134.47 33.574C134.639 33.554 134.868 33.5376 135.164 33.5292L135.107 31.53L135.051 29.5308C134.347 29.5508 133.624 29.6115 133.038 29.7952L133.637 31.7036ZM135.107 31.53L135.219 33.5269C135.875 33.4902 136.521 33.472 137.155 33.472V31.472V29.472C136.444 29.472 135.724 29.4924 134.996 29.5332L135.107 31.53ZM137.155 31.472V33.472C137.853 33.472 138.202 33.4938 138.312 33.5097L138.597 31.53L138.882 29.5504C138.454 29.4889 137.841 29.472 137.155 29.472V31.472ZM138.597 31.53L138.503 33.5278C138.609 33.5328 138.623 33.543 138.575 33.5296C138.535 33.5187 138.335 33.4599 138.112 33.2629L139.433 31.7617L140.754 30.2605C140.058 29.6473 139.175 29.5551 138.691 29.5323L138.597 31.53ZM139.433 31.7617L138.113 33.2642C137.963 33.1327 137.869 33.0006 137.814 32.9065C137.759 32.8133 137.733 32.7416 137.722 32.7104C137.704 32.656 137.718 32.6723 137.729 32.8033L139.721 32.6305L141.714 32.4576C141.687 32.1444 141.633 31.7939 141.519 31.45C141.41 31.1215 141.196 30.6485 140.753 30.2591L139.433 31.7617ZM139.721 32.6305L137.73 32.8168C137.781 33.3548 137.808 34.0232 137.808 34.8316H139.808H141.808C141.808 33.9406 141.778 33.1417 141.713 32.4441L139.721 32.6305ZM139.808 34.8316L137.809 34.8762C137.827 35.6886 137.817 36.3633 137.783 36.9093L139.779 37.0328L141.775 37.1562C141.818 36.466 141.827 35.6735 141.808 34.787L139.808 34.8316ZM139.779 37.0328L137.789 36.834C137.787 36.856 137.785 36.8582 137.789 36.8442C137.792 36.8303 137.801 36.794 137.824 36.7421L139.664 37.5251L141.504 38.308C141.661 37.939 141.736 37.5664 141.769 37.2316L139.779 37.0328ZM139.664 37.5251L137.741 36.9766C137.754 36.9297 137.765 36.9021 137.766 36.8986C137.768 36.8936 137.766 36.9006 137.756 36.9213C137.735 36.9644 137.698 37.0368 137.637 37.1439L139.375 38.1332L141.114 39.1225C141.275 38.8386 141.478 38.4574 141.587 38.0735L139.664 37.5251ZM139.375 38.1332L137.678 37.0761C137.596 37.2075 137.338 37.54 136.787 38.1312L138.251 39.4943L139.714 40.8573C140.279 40.2516 140.77 39.6769 141.073 39.1902L139.375 38.1332ZM138.251 39.4943L136.81 38.1073C136.426 38.5057 135.778 39.0076 134.781 39.5977L135.8 41.3189L136.818 43.0402C137.974 42.356 138.96 41.6416 139.692 40.8812L138.251 39.4943ZM135.8 41.3189L134.804 39.5842C133.932 40.0846 132.72 40.5594 131.115 40.9761L131.618 42.912L132.121 44.8478C133.938 44.376 135.514 43.7888 136.795 43.0537L135.8 41.3189ZM131.618 42.912L131.111 40.9774C129.637 41.364 127.734 41.5778 125.36 41.5778V43.5778V45.5778C127.947 45.5778 130.215 45.3478 132.126 44.8465L131.618 42.912ZM125.36 43.5778V41.5778C122.878 41.5778 120.589 41.262 118.482 40.6448L117.92 42.5642L117.358 44.4835C119.865 45.2181 122.536 45.5778 125.36 45.5778V43.5778ZM117.92 42.5642L118.497 40.6492C116.479 40.0413 114.719 39.0349 113.195 37.622L111.835 39.0887L110.475 40.5554C112.451 42.3867 114.747 43.6973 117.343 44.4792L117.92 42.5642ZM111.835 39.0887L113.203 37.6296C111.754 36.2716 110.552 34.3751 109.654 31.8452L107.769 32.5146L105.884 33.1841C106.947 36.176 108.456 38.6624 110.467 40.5479L111.835 39.0887ZM107.769 32.5146L109.658 31.8571C108.794 29.3751 108.327 26.1683 108.327 22.1753H106.327H104.327C104.327 26.446 104.822 30.1321 105.88 33.1721L107.769 32.5146ZM106.327 22.1753H108.327C108.327 17.8013 109.078 14.2208 110.486 11.3576L108.692 10.4748L106.897 9.59205C105.152 13.139 104.327 17.3589 104.327 22.1753H106.327ZM108.692 10.4748L110.484 11.3619C111.917 8.46731 113.91 6.32153 116.466 4.85253L115.469 3.11859L114.472 1.38464C111.183 3.27521 108.658 6.03358 106.899 9.58782L108.692 10.4748ZM115.469 3.11859L116.466 4.85253C119.032 3.37705 122.136 2.59894 125.85 2.59894V0.598941V-1.40106C121.567 -1.40106 117.75 -0.499395 114.472 1.38464L115.469 3.11859ZM125.85 0.598941V2.59894C128.548 2.59894 130.551 2.88083 131.951 3.35998L132.598 1.46779L133.246 -0.424395C131.262 -1.10371 128.767 -1.40106 125.85 -1.40106V0.598941ZM132.598 1.46779L131.957 3.3622C133.533 3.8956 134.552 4.47166 135.158 5.01426L136.492 3.52407L137.826 2.03388C136.663 0.993256 135.086 0.198445 133.24 -0.426622L132.598 1.46779ZM136.492 3.52407L135.176 5.0305C136.003 5.75238 136.461 6.27903 136.674 6.61811L138.366 5.55137L140.058 4.48463C139.541 3.66523 138.749 2.84034 137.807 2.01764L136.492 3.52407ZM138.366 5.55137L136.677 6.62188C136.713 6.67925 136.736 6.72068 136.749 6.74689C136.762 6.77349 136.762 6.77798 136.757 6.76196L138.655 6.13061L140.552 5.49926C140.428 5.12654 140.248 4.78423 140.056 4.48085L138.366 5.55137ZM138.655 6.13061L136.78 6.82841C136.76 6.77261 136.75 6.7353 136.748 6.72542C136.745 6.71416 136.747 6.71703 136.75 6.73769C136.756 6.78121 136.766 6.8634 136.773 6.99434L138.77 6.88361L140.767 6.77287C140.746 6.39516 140.698 5.88752 140.529 5.43281L138.655 6.13061ZM138.77 6.88361L136.785 7.12991C136.822 7.42475 136.838 7.9673 136.8 8.82419L138.799 8.91091L140.797 8.99762C140.837 8.07824 140.833 7.26925 140.755 6.6373L138.77 6.88361ZM138.799 8.91091L136.799 8.86822C136.782 9.68442 136.72 10.3647 136.625 10.9204L138.597 11.2568L140.568 11.5933C140.704 10.7974 140.778 9.91374 140.798 8.95359L138.799 8.91091ZM138.597 11.2568L136.629 10.9011C136.608 11.014 136.596 11.0231 136.619 10.9702C136.64 10.9232 136.738 10.7176 136.991 10.5201L138.222 12.0967L139.453 13.6733C140.246 13.0542 140.473 12.1186 140.565 11.6125L138.597 11.2568ZM138.222 12.0967L136.804 10.6866C136.963 10.5261 137.109 10.4467 137.166 10.4179C137.229 10.3861 137.262 10.3783 137.242 10.3843L137.818 12.2994L138.395 14.2146C138.679 14.1291 139.205 13.9442 139.64 13.5067L138.222 12.0967ZM137.818 12.2994L137.241 10.3846C137.261 10.3786 137.276 10.3748 137.285 10.3726C137.295 10.3704 137.3 10.3694 137.3 10.3693C137.3 10.3693 137.287 10.3717 137.258 10.3746C137.198 10.3806 137.099 10.3863 136.953 10.3863V12.3863V14.3863C137.389 14.3863 137.915 14.3591 138.396 14.2142L137.818 12.2994ZM136.953 12.3863V10.3863C136.378 10.3863 135.72 10.3682 134.977 10.3309L134.877 12.3284L134.776 14.3259C135.571 14.3658 136.297 14.3863 136.953 14.3863V12.3863ZM134.877 12.3284L135.027 10.334C134.269 10.277 133.753 10.2234 133.444 10.1769L133.147 12.1546L132.849 14.1323C133.309 14.2017 133.946 14.2639 134.726 14.3227L134.877 12.3284ZM133.147 12.1546L133.477 10.182C133.31 10.1542 133.206 10.1275 133.15 10.1098C133.124 10.1015 133.117 10.0979 133.126 10.1018C133.134 10.1054 133.166 10.1203 133.215 10.1511L132.137 11.836L131.06 13.521C131.618 13.8781 132.279 14.0373 132.816 14.1272L133.147 12.1546ZM132.137 11.836L133.316 10.2203C133.337 10.2357 133.33 10.2339 133.297 10.1982C133.265 10.1629 133.216 10.1035 133.153 10.0116L131.503 11.141L129.852 12.2703C130.141 12.6929 130.502 13.1189 130.958 13.4517L132.137 11.836ZM131.503 11.141L133.149 10.0053C132.63 9.25345 131.846 8.52588 130.941 7.82329L129.715 9.40327L128.489 10.9832C129.275 11.5935 129.683 12.0245 129.856 12.2766L131.503 11.141ZM129.715 9.40327L130.941 7.8231C129.556 6.74885 127.601 6.41857 125.533 6.41857V8.41857V10.4186C127.349 10.4186 128.181 10.7447 128.489 10.9834L129.715 9.40327ZM125.533 8.41857V6.41857C122.201 6.41857 119.392 7.75091 117.248 10.3245L118.785 11.6044L120.322 12.8842C121.716 11.2101 123.405 10.4186 125.533 10.4186V8.41857ZM118.785 11.6044L117.254 10.3176C115.03 12.9637 114.132 16.9644 114.132 21.8568H116.132H118.132C118.132 17.2883 119.003 14.4541 120.316 12.8911L118.785 11.6044ZM116.132 21.8568H114.132C114.132 26.7666 115.083 30.8057 117.347 33.5998L118.901 32.3408L120.455 31.0817C119.027 29.3194 118.132 26.3691 118.132 21.8568H116.132ZM118.901 32.3408L117.353 33.6075C119.554 36.2961 122.368 37.7585 125.706 37.7585V35.7585V33.7585C123.7 33.7585 121.977 32.9419 120.448 31.074L118.901 32.3408ZM153.102 43.5778V41.5778C150.665 41.5778 148.95 40.9063 147.729 39.7507L146.354 41.2031L144.979 42.6556C147.104 44.6666 149.887 45.5778 153.102 45.5778V43.5778ZM146.354 41.2031L147.746 39.7671C146.563 38.6201 145.874 36.9835 145.874 34.6H143.874H141.874C141.874 37.8157 142.839 40.5807 144.962 42.6391L146.354 41.2031ZM143.874 34.6H145.874C145.874 33.3962 146.089 32.3198 146.497 31.3484L144.653 30.5742L142.809 29.7999C142.179 31.2997 141.874 32.9074 141.874 34.6H143.874ZM144.653 30.5742L146.491 31.3627C146.862 30.4961 147.526 29.6658 148.594 28.8928L147.421 27.2726L146.249 25.6523C144.702 26.7715 143.52 28.1423 142.815 29.7857L144.653 30.5742ZM147.421 27.2726L148.598 28.8896C149.638 28.1327 151.211 27.4428 153.434 26.8982L152.958 24.9556L152.482 23.0131C149.976 23.6269 147.857 24.4817 146.244 25.6555L147.421 27.2726ZM152.958 24.9556L153.43 26.8991C155.626 26.3655 158.51 26.0358 162.123 25.9413L162.071 23.942L162.019 21.9426C158.249 22.0412 155.058 22.3873 152.486 23.0122L152.958 24.9556ZM162.071 23.942H164.071C164.071 21.8971 163.558 19.9498 162.06 18.6416L160.744 20.148L159.429 21.6544C159.7 21.8909 160.071 22.4729 160.071 23.942H162.071ZM160.744 20.148L162.076 18.656C160.697 17.4248 158.821 16.9895 156.822 16.9895V18.9895V20.9895C158.323 20.9895 159.061 21.3266 159.412 21.64L160.744 20.148ZM156.822 18.9895V16.9895C155.036 16.9895 153.39 17.2933 152.007 18.0412L152.958 19.8005L153.909 21.5597C154.526 21.2264 155.456 20.9895 156.822 20.9895V18.9895ZM152.958 19.8005L152.007 18.0412C151.05 18.5584 150.266 19.0053 149.861 19.3183L151.084 20.901L152.306 22.4837C152.302 22.4869 152.333 22.4637 152.42 22.4081C152.501 22.3561 152.61 22.2891 152.752 22.2057C153.037 22.0389 153.42 21.8243 153.909 21.5597L152.958 19.8005ZM151.084 20.901L149.779 19.3852C149.861 19.3144 149.98 19.2451 150.123 19.2071C150.261 19.1704 150.363 19.1782 150.401 19.184L150.103 21.1617L149.805 23.1394C150.704 23.2748 151.633 23.0673 152.388 22.4168L151.084 20.901ZM150.103 21.1617L150.398 19.1834C150.006 19.1252 149.557 19.0189 149.047 18.8536L148.431 20.7562L147.814 22.6588C148.496 22.8797 149.162 23.0437 149.809 23.1399L150.103 21.1617ZM148.431 20.7562L149.065 18.8596C148.514 18.6749 147.91 18.4607 147.255 18.2162L146.556 20.0901L145.857 21.964C146.548 22.2215 147.194 22.4514 147.796 22.6528L148.431 20.7562ZM146.556 20.0901L147.302 18.2344C147.339 18.2491 147.36 18.2607 147.366 18.2639C147.372 18.2672 147.368 18.2651 147.352 18.2545L146.239 19.9163L145.126 21.5781C145.32 21.7081 145.55 21.8413 145.81 21.9457L146.556 20.0901ZM146.239 19.9163L147.523 18.3826C147.677 18.5116 147.803 18.6725 147.892 18.8511C147.979 19.0249 148.013 19.1818 148.025 19.2939L146.037 19.5109L144.049 19.7278C144.114 20.3282 144.382 20.9699 144.955 21.45L146.239 19.9163ZM146.037 19.5109H148.037C148.037 19.5259 148.036 19.528 148.038 19.5148C148.039 19.5021 148.041 19.4794 148.046 19.4456L146.066 19.1633L144.086 18.881C144.058 19.0786 144.037 19.293 144.037 19.5109H146.037ZM146.066 19.1633L148.05 19.4109C148.06 19.337 148.094 19.1322 148.172 18.7424L146.21 18.3524L144.248 17.9624C144.172 18.3449 144.11 18.6807 144.081 18.9157L146.066 19.1633ZM146.21 18.3524L148.171 18.7439C148.236 18.42 148.338 17.9958 148.485 17.4622L146.556 16.9333L144.627 16.4043C144.466 16.9906 144.338 17.5125 144.249 17.9609L146.21 18.3524ZM146.556 16.9333L148.489 17.4467C148.633 16.9025 148.747 16.5716 148.822 16.3999L146.989 15.601L145.155 14.8022C144.961 15.2483 144.786 15.8056 144.623 16.4198L146.556 16.9333ZM146.989 15.601L148.758 16.5342C148.746 16.5565 148.787 16.4663 149.019 16.2994L147.854 14.6743L146.688 13.0491C146.113 13.4615 145.578 13.9891 145.22 14.6679L146.989 15.601ZM147.854 14.6743L149.128 16.2158C149.058 16.2736 149.045 16.2692 149.167 16.2042C149.271 16.1487 149.426 16.0733 149.645 15.9772C150.083 15.7851 150.698 15.5438 151.505 15.2515L150.824 13.371L150.143 11.4904C149.297 11.7967 148.59 12.0719 148.038 12.3143C147.556 12.5258 146.984 12.7981 146.58 13.1327L147.854 14.6743ZM150.824 13.371L151.505 15.2516C152.832 14.7711 154.951 14.4732 158.005 14.4732V12.4732V10.4732C154.791 10.4732 152.123 10.7738 150.143 11.4904L150.824 13.371ZM158.005 12.4732V14.4732C162.024 14.4732 164.669 15.4554 166.318 17.0675C167.959 18.6713 168.953 21.2307 168.953 25.1294H170.953H172.953C172.953 20.5907 171.789 16.8219 169.114 14.207C166.447 11.6003 162.618 10.4732 158.005 10.4732V12.4732ZM170.953 25.1294H168.953V41.5215H170.953H172.953V25.1294H170.953ZM170.953 41.5215H168.953C168.953 41.511 168.955 41.4678 168.976 41.4056C168.997 41.3418 169.029 41.2859 169.061 41.2444L170.636 42.4774L172.21 43.7104C172.718 43.0628 172.953 42.3023 172.953 41.5215H170.953ZM170.636 42.4774L169.048 41.2618C169.21 41.0493 169.406 40.9361 169.54 40.8858C169.657 40.8423 169.704 40.8539 169.626 40.8539V42.8539V44.8539C170.396 44.8539 171.489 44.6537 172.224 43.693L170.636 42.4774ZM169.626 42.8539V40.8539H165.301V42.8539V44.8539H169.626V42.8539ZM165.301 42.8539V40.8539C165.16 40.8539 165.084 40.836 165.054 40.827L164.465 42.7381L163.875 44.6492C164.345 44.7943 164.827 44.8539 165.301 44.8539V42.8539ZM164.465 42.7381L165.236 40.8929C165.306 40.9223 165.348 40.952 165.361 40.9628C165.374 40.9729 165.363 40.9661 165.331 40.9284L163.801 42.2167L162.271 43.5051C162.626 43.9264 163.092 44.3319 163.693 44.5832L164.465 42.7381ZM163.801 42.2167L165.385 40.9949L163.597 38.6779L162.013 39.8998L160.43 41.1216L162.218 43.4386L163.801 42.2167ZM162.013 39.8998V37.8998H161.812V39.8998V41.8998H162.013V39.8998ZM161.812 39.8998L160.16 38.7711C159.511 39.7215 158.647 40.4061 157.515 40.8433L158.236 42.709L158.956 44.5747C160.823 43.8538 162.344 42.6653 163.463 41.0285L161.812 39.8998ZM158.236 42.709L157.507 40.8466C156.304 41.3173 154.849 41.5778 153.102 41.5778V43.5778V45.5778C155.24 45.5778 157.206 45.2595 158.964 44.5715L158.236 42.709ZM156.274 36.8589V38.8589C158.368 38.8589 160.297 38.3179 161.7 36.9092L160.283 35.4978L158.866 34.0864C158.462 34.492 157.718 34.8589 156.274 34.8589V36.8589ZM160.283 35.4978L161.7 36.909C162.785 35.8197 163.589 34.5836 163.949 33.1898L162.013 32.6885L160.077 32.1872C159.938 32.724 159.588 33.3609 158.866 34.0866L160.283 35.4978ZM162.013 32.6885H164.013V29.4736H162.013H160.013V32.6885H162.013ZM162.013 29.4736V27.4736C159.285 27.4736 157.028 27.6847 155.384 28.2035L155.986 30.1108L156.588 32.0181C157.636 31.6874 159.397 31.4736 162.013 31.4736V29.4736ZM155.986 30.1108L155.401 28.1982C153.92 28.6512 152.486 29.374 151.66 30.6374L153.333 31.7326L155.006 32.8279C155.064 32.7396 155.399 32.3816 156.571 32.0234L155.986 30.1108ZM153.333 31.7326L151.674 30.6156C151.016 31.593 150.67 32.6944 150.67 33.8757H152.67H154.67C154.67 33.5124 154.766 33.1853 154.992 32.8496L153.333 31.7326ZM152.67 33.8757H150.67C150.67 35.4042 151.166 36.9664 152.627 37.9047L153.708 36.2217L154.788 34.5387C154.786 34.5369 154.779 34.5404 154.758 34.4926C154.727 34.4223 154.67 34.239 154.67 33.8757H152.67ZM153.708 36.2217L152.662 37.9263C153.74 38.588 154.98 38.8589 156.274 38.8589V36.8589V34.8589C155.531 34.8589 155.06 34.7052 154.754 34.5172L153.708 36.2217Z"
        fill="white" mask="url(#path-1-inside-1_1493_14)" />
      <path
        d="M91.2817 13.4653C92.0107 13.3825 92.7484 13.4917 93.4214 13.7817C94.0102 14.0357 94.5317 14.4198 94.9458 14.9038L95.1167 15.1177L101.796 24.0835C102.179 24.5966 102.436 25.1888 102.551 25.814L102.591 26.0845C102.676 26.8085 102.568 27.5419 102.278 28.2114L97.8169 38.4478V38.4487C97.5267 39.1166 97.064 39.6973 96.4761 40.1323C95.8878 40.5671 95.1943 40.8414 94.4663 40.9253H94.4653L83.3169 42.2212C82.6797 42.2953 82.0352 42.2213 81.4331 42.0073L81.1772 41.9077L80.9292 41.7905C80.3611 41.5001 79.8664 41.0834 79.4849 40.5708V40.5698L72.8042 31.603C72.3673 31.0164 72.0934 30.3263 72.0093 29.6021H72.0083C71.9239 28.8775 72.0332 28.143 72.3237 27.4731L72.3228 27.4722L76.7837 17.2388V17.2368C77.0738 16.5683 77.5367 15.9871 78.1245 15.5522C78.7122 15.1177 79.4052 14.8446 80.1333 14.7612H80.1353L91.2808 13.4644L91.2817 13.4653Z"
        stroke="white" stroke-width="2" />
      <mask id="mask0_1493_14" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="76" y="16" width="21"
        height="22">
        <path d="M96.854 16.8674H76.2964V37.5131H96.854V16.8674Z" fill="white" />
      </mask>
      <g mask="url(#mask0_1493_14)">
        <path
          d="M94.3995 22.7964C94.76 21.9448 94.7057 21.0581 94.2008 20.4607C93.5882 19.7363 92.4881 19.6639 91.4604 20.1709C92.5543 20.9078 93.5431 21.7911 94.3995 22.7964Z"
          fill="white" />
        <path
          d="M80.5898 31.0079C80.5055 31.2205 80.3594 31.4028 80.1707 31.5311C79.9818 31.6591 79.7592 31.7272 79.531 31.7265H78.5242C78.4735 31.7278 78.4229 31.7187 78.3756 31.7003C78.3284 31.6816 78.2852 31.6538 78.2488 31.6182C78.2124 31.5826 78.1835 31.5402 78.1639 31.493C78.144 31.4462 78.1338 31.3956 78.1338 31.3447C78.1338 31.2935 78.144 31.2433 78.1639 31.1962C78.1835 31.1493 78.2124 31.1066 78.2488 31.071C78.2852 31.0354 78.3284 31.0076 78.3756 30.9889C78.4229 30.9704 78.4735 30.9617 78.5242 30.963H79.531C79.6072 30.9633 79.6815 30.9405 79.7446 30.8977C79.8074 30.8549 79.8562 30.7944 79.8845 30.7235C79.9025 30.6761 79.9298 30.633 79.9647 30.5965C79.9995 30.5599 80.0411 30.5306 80.0871 30.5106C80.1334 30.4903 80.1832 30.4794 80.2335 30.4788C80.2839 30.4778 80.3339 30.4872 80.3806 30.5059C80.4275 30.525 80.4701 30.5528 80.5058 30.5883C80.5419 30.6236 80.5705 30.6661 80.5898 30.7126C80.6093 30.7594 80.6193 30.8094 80.6196 30.8599C80.6196 30.9105 80.609 30.9614 80.5898 31.0079ZM83.0868 26.0013C83.2748 26.0014 83.4585 25.9455 83.6149 25.8406C83.7712 25.7357 83.8931 25.5867 83.9652 25.4122C84.037 25.2378 84.056 25.0459 84.0193 24.8607C83.9826 24.6755 83.8922 24.5054 83.7591 24.3719C83.6264 24.2383 83.457 24.1474 83.2726 24.1105C83.088 24.0737 82.8972 24.0926 82.7234 24.1648C82.5496 24.237 82.401 24.3594 82.2966 24.5164C82.1922 24.6734 82.1365 24.858 82.1365 25.0468C82.1365 25.2999 82.2366 25.5426 82.4147 25.7217C82.5931 25.9007 82.8347 26.0013 83.0868 26.0013ZM86.1277 24.0924C85.1846 24.0924 85.0124 26.7819 84.9901 28.2918H84.4669C84.4013 28.2919 84.337 28.2748 84.2798 28.2424C84.2229 28.21 84.175 28.1633 84.1415 28.1069L83.4402 26.9373C83.3389 26.7681 83.1956 26.6281 83.0246 26.5309C82.8533 26.4337 82.66 26.3826 82.4635 26.3827H81.5624C81.5506 26.3819 81.5385 26.3819 81.5266 26.3827H80.5155C80.3038 26.3826 80.0961 26.4418 79.9162 26.5536C79.7362 26.6654 79.5904 26.8253 79.4959 27.0155L78.9457 28.1218C78.9031 28.212 78.8975 28.3154 78.9302 28.4098C78.9625 28.5042 79.0303 28.5821 79.1192 28.6267C79.2084 28.6714 79.311 28.6794 79.4058 28.6488C79.5003 28.6183 79.5792 28.5518 79.6258 28.4635L80.1757 27.3583C80.2074 27.2949 80.2559 27.2416 80.3159 27.2044C80.3759 27.1672 80.4449 27.1475 80.5155 27.1475H80.9786L80.3122 28.7789C80.2105 29.028 80.1993 29.3052 80.2808 29.5618C80.3625 29.8184 80.5313 30.0379 80.7582 30.1816L82.3261 31.1759V32.8738C82.3249 32.9247 82.3336 32.9752 82.3522 33.023C82.3706 33.0705 82.3986 33.1135 82.434 33.1501C82.4694 33.1866 82.5117 33.2156 82.5586 33.2356C82.6053 33.2553 82.6556 33.2656 82.7063 33.2656C82.7573 33.2656 82.8073 33.2553 82.8543 33.2356C82.9009 33.2156 82.9435 33.1866 82.9789 33.1501C83.0143 33.1135 83.042 33.0705 83.0603 33.023C83.079 32.9752 83.0877 32.9247 83.0865 32.8738V30.9639C83.0865 30.8996 83.0703 30.8359 83.0392 30.7797C83.0081 30.7232 82.9634 30.6754 82.9093 30.6408L82.1331 30.1488L83.0833 27.8227L83.4899 28.5005C83.5913 28.6698 83.7346 28.8098 83.9058 28.907C84.0768 29.0042 84.2705 29.0552 84.4669 29.0551H85.374C85.4234 29.0551 85.4722 29.0649 85.5176 29.0839C85.5629 29.103 85.6043 29.1308 85.6391 29.1659C85.6739 29.201 85.7013 29.2426 85.7199 29.2884C85.7386 29.3342 85.7479 29.3832 85.7476 29.4327V29.4404C85.7454 29.5406 85.7044 29.636 85.6335 29.7064C85.5626 29.7769 85.4672 29.817 85.3674 29.8183C85.1582 29.8332 85.0255 30.0168 85.0401 30.2271C85.2543 33.254 85.8881 33.254 86.1265 33.254C87.156 33.254 87.2661 30.0504 87.2661 28.6732C87.2661 27.296 87.1563 24.0924 86.1277 24.0924Z"
          fill="white" />
        <path
          d="M85.703 20.0699C85.0856 20.107 84.4752 20.217 83.8836 20.3975C82.0667 20.9311 80.8318 21.9461 80.1448 22.6186L80.1401 22.6239C80.0705 22.7117 79.9368 22.9166 79.9878 23.1381C80.0736 23.484 80.5706 23.6378 80.9315 23.5862C81.188 23.5519 81.376 23.3981 81.4615 23.3116L81.464 23.3095C82.0133 22.827 82.9396 22.1385 84.2604 21.742C84.924 21.5483 85.6116 21.4498 86.3026 21.4493C88.3277 21.4493 90.1471 22.2766 91.4697 23.6048C92.1496 24.2856 92.6889 25.0941 93.0572 25.9843C93.4253 26.8745 93.6155 27.8289 93.6161 28.7929C93.6161 30.8268 92.7924 32.654 91.4697 33.9823C90.1471 35.3106 88.3293 36.1378 86.3026 36.1378C84.4807 36.1381 82.7242 35.456 81.3767 34.2245C81.2536 34.0878 81.1013 33.9807 80.9312 33.9108C80.3823 33.6695 79.6269 33.79 79.5411 34.0831C79.5243 34.1343 79.5243 34.2186 79.5896 34.3694L79.5971 34.3818C79.7618 34.5851 79.9381 34.7789 80.1246 34.9625C81.5492 36.3929 83.1112 36.9445 83.6775 37.1181C84.9837 37.5264 86.3669 37.621 87.716 37.394C89.0651 37.1671 90.3423 36.6251 91.4446 35.8116C92.5468 34.9981 93.4433 33.9357 94.0619 32.7105C94.6801 31.4852 95.0034 30.131 95.0053 28.7572C95.0053 26.344 94.0267 24.1895 92.448 22.6037C91.0812 21.2313 89.2985 20.3546 87.3809 20.1115C87.3682 20.1099 87.356 20.1036 87.3473 20.0938C87.3386 20.084 87.3337 20.0714 87.3333 20.0582L87.3402 19.11V19.096C87.3402 19.0814 87.3461 19.0675 87.3564 19.0572C87.3663 19.0469 87.3803 19.0411 87.3949 19.0411H88.9706C89.034 19.0412 89.0965 19.0288 89.1549 19.0046C89.213 18.9804 89.2662 18.9448 89.3109 18.9C89.3554 18.8551 89.3908 18.8019 89.4151 18.7432C89.439 18.6846 89.4514 18.6218 89.4514 18.5584V17.4047C89.4508 17.2623 89.3942 17.1259 89.2941 17.0253C89.1937 16.9246 89.0579 16.8679 88.9162 16.8674H84.0794C84.0163 16.8673 83.9536 16.8797 83.8954 16.904C83.837 16.9282 83.7841 16.9637 83.7394 17.0085C83.6946 17.0533 83.6595 17.1066 83.6353 17.1652C83.611 17.2237 83.5989 17.2865 83.5989 17.3499V18.5017C83.5992 18.6441 83.6558 18.7806 83.7559 18.8813C83.8563 18.982 83.9921 19.0388 84.1338 19.0393H85.6551C85.6623 19.0393 85.6694 19.0407 85.6759 19.0434C85.6828 19.0462 85.6887 19.0502 85.6937 19.0553C85.6989 19.0604 85.703 19.0665 85.7055 19.0731C85.7083 19.0798 85.7098 19.0869 85.7098 19.0941V19.1082"
          fill="white" />
      </g>
    </svg>
    <div id="fullscreenLogoDivider" class="fullscreen-logo-divider"></div>
    <svg id="fullscreenLogo1" class="fullscreen-logo" width="200" height="51" viewBox="0 0 200 51" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1494_15)">
        <path
          d="M62.5816 38.3977C62.5816 35.4449 62.5815 32.5906 62.5816 29.7363C62.5816 28.1015 62.5808 28.0968 64.1528 27.797C64.4095 27.7481 64.6783 27.7617 65.0552 27.7398C65.0552 28.3575 65.0552 28.9536 65.0552 29.6665C68.0556 26.4872 70.9085 26.2381 74.8051 29.6032C76.5809 28.0691 78.6488 27.1049 81.0452 27.1951C83.3877 27.2832 85.4328 28.1634 87.1028 30.3095C87.1028 29.4635 87.002 28.925 87.1367 28.4528C87.2338 28.1123 87.5956 27.761 87.9301 27.598C88.2232 27.4552 88.6801 27.4735 88.9951 27.5963C89.2741 27.7051 89.6527 28.0544 89.6544 28.2997C89.6918 33.7773 89.6831 39.2552 89.6831 44.8928C88.9733 44.8928 88.2909 44.9415 87.6239 44.8627C87.428 44.8395 87.1522 44.4678 87.1269 44.2332C87.0579 43.5939 87.1032 42.9425 87.1032 42.1695C86.4536 42.6917 85.9455 43.1897 85.3559 43.56C80.1971 46.7998 73.402 43.8048 72.2115 37.9897C71.8039 35.9987 71.9833 34.0885 72.8922 32.2715C73.1464 31.7636 73.0653 31.4493 72.6733 31.0755C71.2345 29.7036 68.8193 28.9271 67.2291 30.4047C66.3916 31.1829 65.6758 32.4411 65.5494 33.5546C65.2084 36.5568 65.2074 39.5975 65.085 42.6235C65.0561 43.3386 65.0808 44.0559 65.0808 44.8338C64.2645 44.8338 63.5205 44.8338 62.5816 44.8338C62.5816 42.7247 62.5816 40.6104 62.5816 38.3977ZM74.8053 37.839C74.9029 38.1132 74.9821 38.3955 75.1007 38.6604C77.0099 42.9217 82.686 43.9116 85.7133 40.5141C87.4904 38.5198 87.8091 35.5272 86.5131 33.0058C85.319 30.6828 83.069 29.5164 80.2769 29.73C76.3001 30.0341 73.7957 34.2745 74.8053 37.839Z"
          fill="white" />
        <path
          d="M189.033 32.8393C187.578 34.2452 185.712 34.2225 183.748 34.5698C187.421 36.7719 189.938 39.7222 191.093 43.7128C191.248 44.2488 191.369 44.7947 191.381 45.3906C189.628 44.3008 188.744 42.5385 187.499 40.699C187.499 41.796 187.499 42.5894 187.499 43.3828C187.377 43.4075 187.255 43.4322 187.132 43.4569C186.717 42.2479 186.303 41.039 185.798 39.5674C185.715 40.6221 185.654 41.4114 185.592 42.2007C185.445 42.2218 185.297 42.2429 185.15 42.264C184.773 41.06 184.397 39.856 183.981 38.5252C183.933 39.3444 183.893 40.0288 183.852 40.7133C183.714 40.7416 183.576 40.7699 183.438 40.7981C183.028 39.6185 182.618 38.4388 182.202 37.242C182.15 37.757 182.101 38.2516 182.052 38.7462C181.93 38.7754 181.807 38.8046 181.685 38.8338C181.458 38.3008 181.21 37.775 181.008 37.2328C180.756 36.5588 180.586 35.8511 180.289 35.1989C180.157 34.9084 179.802 34.7178 179.548 34.4819C179.421 34.7739 179.187 35.0647 179.184 35.3578C179.156 38.1449 179.179 40.9324 179.153 43.7195C179.15 44.0992 179.009 44.7774 178.847 44.8036C178.18 44.9118 177.476 44.8496 176.795 44.773C176.701 44.7624 176.597 44.3204 176.597 44.078C176.586 37.0933 176.592 30.1086 176.583 23.124C176.582 22.496 176.831 22.2302 177.466 22.2478C180.267 22.3253 183.074 22.2961 185.868 22.4793C188.658 22.6622 190.825 25.2086 190.886 28.0162C190.925 29.8678 190.568 31.5262 189.033 32.8393ZM184.375 31.8994C184.637 31.8809 184.906 31.8919 185.161 31.8393C187.209 31.4172 188.101 30.4141 188.123 28.5288C188.146 26.4786 187.325 25.2816 185.224 24.9814C183.412 24.7225 181.543 24.8393 179.699 24.847C179.522 24.8477 179.198 25.2492 179.193 25.47C179.152 27.3701 179.182 29.2715 179.16 31.1723C179.154 31.7347 179.386 31.9142 179.927 31.906C181.347 31.8845 182.767 31.8992 184.375 31.8994Z"
          fill="white" />
        <path
          d="M110.913 22.8583C110.913 30.2307 110.913 37.5071 110.913 44.8397C110.114 44.8397 109.4 44.8397 108.563 44.8397C108.563 43.9983 108.563 43.1414 108.563 42.1817C103.222 46.8145 97.7361 44.707 95.247 41.6544C92.4519 38.2264 92.6131 32.9914 96.1189 29.6686C99.2287 26.7212 104.482 25.9446 108.531 30.1695C108.531 27.5362 108.517 24.9903 108.546 22.4449C108.551 22.0644 108.69 21.4023 108.879 21.3597C109.469 21.227 110.158 21.2038 110.711 21.4046C110.917 21.4798 110.854 22.2883 110.913 22.8583ZM108.149 38.6593C108.277 37.7972 108.506 36.936 108.514 36.0728C108.553 32.0646 105.494 29.3272 101.484 29.735C97.673 30.1224 94.9062 34.2485 96.1439 37.9978C96.9597 40.4688 99.289 42.3636 101.663 42.5308C104.549 42.734 106.842 41.4109 108.149 38.6593Z"
          fill="white" />
        <path
          d="M32.8818 1.04688C34.1713 0.899538 35.4769 1.09525 36.668 1.6123C37.8586 2.12948 38.8949 2.95077 39.6709 3.99512V3.99609L50.5146 18.6543C51.2415 19.637 51.715 20.7834 51.8945 21.9912L51.9268 22.2334C52.0673 23.4492 51.9068 24.6799 51.4609 25.8164L51.3682 26.042L44.1279 42.7744V42.7754C43.6122 43.9707 42.7914 45.0087 41.749 45.7852C40.7066 46.5612 39.479 47.0486 38.1904 47.1982H38.1895L20.0938 49.3174C18.885 49.4589 17.6609 49.298 16.5303 48.8506L16.3057 48.7578L16.084 48.6572C14.9859 48.1369 14.0313 47.3519 13.3057 46.3701V46.3691L2.46191 31.7109C1.73497 30.728 1.26054 29.582 1.08105 28.374L1.0498 28.1318C0.899855 26.8351 1.09237 25.5215 1.6084 24.3232L1.60742 24.3223L8.84766 7.59082L8.84863 7.58984C9.36402 6.39381 10.1844 5.35542 11.2266 4.5791C12.2685 3.80297 13.4962 3.3157 14.7852 3.16699H14.7871L32.8828 1.04785L32.8818 1.04688Z"
          stroke="white" stroke-width="2" />
        <path
          d="M168.678 28.3547C168.678 26.6161 168.722 24.9742 168.663 23.336C168.62 22.1232 169.418 22.2837 170.184 22.2409C171.006 22.1949 171.455 22.3449 171.449 23.3456C171.41 30.1362 171.417 36.9272 171.445 43.7179C171.448 44.5049 171.201 44.7386 170.427 44.7136C168.427 44.6491 168.691 44.9216 168.681 42.9778C168.668 40.3206 168.656 37.663 168.692 35.0062C168.701 34.2711 168.454 34.045 167.723 34.0529C164.715 34.0853 161.707 34.0958 158.699 34.0475C157.861 34.034 157.718 34.3659 157.726 35.0879C157.756 37.9417 157.713 40.7964 157.755 43.6499C157.767 44.4511 157.55 44.7447 156.706 44.7181C155.16 44.6693 155.158 44.7162 155.158 43.1793C155.158 36.6181 155.153 30.0569 155.172 23.4957C155.173 23.108 155.307 22.4241 155.487 22.3866C156.146 22.2495 156.854 22.2897 157.532 22.3658C157.633 22.3771 157.727 22.9389 157.729 23.2467C157.746 25.6742 157.769 28.1025 157.721 30.5292C157.705 31.3273 157.982 31.5293 158.745 31.52C161.72 31.4836 164.695 31.4825 167.67 31.5205C168.445 31.5304 168.755 31.3073 168.689 30.5188C168.632 29.8345 168.678 29.1419 168.678 28.3547Z"
          fill="white" />
        <path
          d="M136.365 43.2788C131.434 39.2599 131.867 32.0214 136.875 28.6581C141.702 25.4158 148.692 27.5988 150.173 34.0735C150.338 34.7928 150.335 35.5498 150.421 36.4001C145.448 36.4001 140.54 36.4001 135.662 36.4001C135.187 38.1392 136.925 41.0948 138.954 41.9733C140.688 42.724 142.383 42.6886 144.121 42.1018C145.884 41.5067 146.909 40.1111 147.81 38.6349C150.434 39.8306 150.311 39.471 148.512 41.891C147.275 43.555 145.472 44.4134 143.352 44.7361C140.826 45.1203 138.545 44.6963 136.365 43.2788ZM136.697 32.209C136.387 32.8657 136.077 33.5224 135.739 34.2376C139.741 34.2376 143.605 34.2376 147.539 34.2376C146.968 31.8359 145.431 30.4644 143.152 29.7884C140.841 29.1027 137.841 30.3518 136.697 32.209Z"
          fill="white" />
        <path
          d="M46.3246 44.0818C46.013 43.8609 45.7975 43.6199 45.5362 43.4473C42.316 41.3203 40.887 37.5214 41.8926 33.7292C42.8156 30.2489 45.976 27.6579 49.7455 27.4771C50.8937 27.422 52.0622 27.7826 53.3012 27.9388C54.4187 28.5757 55.4565 29.2267 56.5469 29.9108C56.5469 29.5016 56.5755 28.9948 56.5398 28.4925C56.493 27.8345 56.7111 27.5504 57.4295 27.5516C58.9292 27.5543 58.9294 27.519 58.9294 29.0189C58.9295 33.9056 58.9294 38.7924 58.9294 43.6791C58.9294 44.0364 58.9294 44.3938 58.9294 44.8237C58.139 44.8237 57.4025 44.8237 56.5827 44.8237C56.5827 43.9811 56.5827 43.1428 56.5827 42.074C53.5049 44.9673 50.1465 45.6122 46.3246 44.0818ZM52.2901 29.8291C48.9404 29.0136 46.0728 30.2402 44.5378 33.1453C43.1416 35.7879 43.8086 39.1801 46.1492 41.1776C46.4501 41.4344 46.8715 41.552 47.3695 41.791C50.1983 43.2008 53.6038 42.4888 55.3389 40.188C57.5832 37.2121 57.0252 31.7227 52.2901 29.8291Z"
          fill="white" />
        <path
          d="M121.498 40.8134C122.572 41.3362 123.538 42.0079 124.607 42.4166C125.705 42.8365 127.184 42.0693 127.679 41.0413C128.205 39.9492 127.962 38.8038 126.86 38.022C125.901 37.3419 124.825 36.8255 123.804 36.2305C122.619 35.5397 121.554 34.7281 121.055 33.3869C120.442 31.7387 120.933 29.6549 122.192 28.5044C123.726 27.1023 125.817 26.757 127.758 27.7275C128.71 28.2029 129.547 28.9027 130.436 29.5009C130.518 29.6674 130.601 29.8339 130.683 30.0004C130.261 30.255 129.785 30.4514 129.431 30.7787C128.967 31.2081 128.623 31.1705 128.143 30.8102C127.599 30.4012 127.015 30.004 126.387 29.7538C125.157 29.2637 123.936 29.7413 123.391 30.8192C122.857 31.8736 123.127 32.8303 124.307 33.6098C125.697 34.5286 127.192 35.2969 128.553 36.2554C131.228 38.1401 130.678 42.3846 128.367 43.8524C125.657 45.5738 121.964 44.9878 120.059 42.3746C120.512 41.8712 120.974 41.359 121.498 40.8134Z"
          fill="white" />
        <path
          d="M117.441 44.6341C116.697 44.8023 115.967 44.8784 115.079 44.9709C115.079 44.4696 115.079 44.1235 115.079 43.7774C115.079 38.8313 115.079 33.8851 115.079 28.9389C115.079 27.5593 115.08 27.5596 116.5 27.5673C116.789 27.5689 117.078 27.5676 117.454 27.5676C117.454 33.2921 117.454 38.917 117.441 44.6341Z"
          fill="white" />
        <path
          d="M117.425 21.2744C118.594 22.6449 118.35 24.074 116.949 24.6212C116.045 24.9741 115.342 24.6554 114.768 24.0048C114.202 23.3622 114.227 22.3216 114.85 21.6622C115.424 21.0553 116.106 20.586 117.018 21.0459C117.135 21.1044 117.246 21.1726 117.425 21.2744Z"
          fill="white" />
        <path
          d="M18.1584 29.7867C15.0044 31.1423 12.1205 32.9415 9.35498 35.2385C9.94778 33.1252 12.3857 30.7043 14.8425 29.7251C15.9719 29.2749 17.1415 28.9213 18.301 28.5486C19.4303 28.1856 20.5699 27.8542 21.7916 27.4825C21.7916 20.9918 21.7916 14.477 21.7916 7.89546C22.1242 7.87394 22.3756 7.83637 22.6255 7.84469C26.4526 7.97204 30.3032 7.88644 34.1006 8.29134C39.1347 8.82811 42.2019 12.6098 42.1772 17.6985C42.1529 22.7108 39.0061 26.3235 33.9953 26.9608C32.0673 27.206 30.113 27.2571 28.1688 27.3646C27.3502 27.4098 26.5268 27.3721 25.6201 27.3721C25.6201 33.0255 25.6201 38.5861 25.6201 44.2264C24.3383 44.2264 23.1389 44.2264 21.8443 44.2264C21.8443 39.1335 21.8443 34.011 21.8443 28.8885C21.1249 30.6542 21.3115 32.6542 20.0694 34.2774C20.0694 33.3561 20.0694 32.4348 20.0694 31.5136C19.9948 31.5028 19.9201 31.4921 19.8455 31.4813C19.4624 33.1004 19.0793 34.7195 18.6962 36.3386C18.6263 36.3282 18.5565 36.3177 18.4866 36.3072C18.3971 35.2662 18.3075 34.2252 18.218 33.1842C18.1637 33.1766 18.1093 33.169 18.055 33.1615C17.7454 34.726 17.4358 36.2906 17.1261 37.8552C17.0415 37.8449 16.9569 37.8346 16.8723 37.8243C16.7898 37.167 16.7074 36.5097 16.625 35.8525C16.5405 35.8337 16.456 35.8149 16.3715 35.796C16.0095 36.9463 15.6476 38.0965 15.2857 39.2467C15.2236 39.2435 15.1616 39.2403 15.0996 39.2371C15.0996 38.4524 15.0996 37.6677 15.0996 36.8829C13.8425 38.6925 13.7741 41.1026 11.8229 42.4962C11.4776 39.5927 14.4009 33.9734 18.32 30.011C18.3151 29.8805 18.2367 29.8336 18.1584 29.7867ZM35.355 12.423C32.2176 11.0172 28.891 11.6243 25.6187 11.4086C25.6187 15.5675 25.6187 19.6125 25.6187 23.9485C28.2709 23.7927 30.8745 23.7872 33.4333 23.4486C36.1026 23.0955 37.6819 21.3454 38.2349 18.7551C38.7529 16.329 37.6633 13.9378 35.355 12.423Z"
          fill="white" />
        <path
          d="M18.1904 29.835C18.237 29.8336 18.3153 29.8805 18.3451 29.9498C18.2718 29.9426 18.247 29.913 18.1904 29.835Z"
          fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_1494_15">
          <rect width="200" height="51" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </div>
    `;
    document.body.appendChild(this.fullscreenImageOverlay);

    // Lưu trữ tham chiếu đến các phần tử con
    this.fullscreenImage =
      this.fullscreenImageOverlay.querySelector("#fullscreenImage");
    this.closeImageOverlayButton =
      this.fullscreenImageOverlay.querySelector("#closeImageOverlay");
    this.saveImageButton =
      this.fullscreenImageOverlay.querySelector("#saveImageBtn");
    this.copyImageButton =
      this.fullscreenImageOverlay.querySelector("#copyImageBtn");
    this.shareImageButton =
      this.fullscreenImageOverlay.querySelector("#shareImageBtn");

    // NEW: Tham chiếu đến các phần tử logo mới
    this.fullscreenLogoContainer = this.fullscreenImageOverlay.querySelector(
      "#fullscreenLogoContainer"
    );
    this.fullscreenLogo1 =
      this.fullscreenImageOverlay.querySelector("#fullscreenLogo1");
    this.fullscreenLogo2 =
      this.fullscreenImageOverlay.querySelector("#fullscreenLogo2");
    this.fullscreenLogoDivider = this.fullscreenImageOverlay.querySelector(
      "#fullscreenLogoDivider"
    );

    this._setupFullscreenImageOverlayEvents();
  }

  /**
   * Creates the main container for alert messages.
   */
  _createAlertContainer() {
    this.alertContainer = document.createElement("div");
    this.alertContainer.id = "vc-vu-alert-container";
    document.body.appendChild(this.alertContainer);
  }

  /**
   * NEW: Creates the loading screen HTML structure.
   */
  _createLoadingScreen() {
    this.loadingScreenElement = document.createElement("div");
    this.loadingScreenElement.id = "loadingScreen";
    this.loadingScreenElement.classList.add("VC-Vu-component-loading");
    this.loadingScreenElement.innerHTML = `
             <div class="loaderVu">
        <svg class="logoVu" width="120" height="120" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1551_31)">
                <path
                    d="M19.8477 0.529297C20.648 0.440501 21.4582 0.556632 22.1963 0.867188C22.9334 1.17748 23.5728 1.6698 24.0508 2.29297V2.29395L30.6016 10.875C31.079 11.5006 31.378 12.2361 31.4697 13.0068C31.5616 13.7773 31.4437 14.5581 31.127 15.2715L26.7529 25.0664V25.0674C26.4359 25.7793 25.9303 26.3992 25.2861 26.8643C24.7222 27.271 24.0699 27.5463 23.3799 27.6689L23.082 27.7119L12.1514 28.9531C11.4515 29.0325 10.7437 28.9528 10.083 28.7236L9.80273 28.6162C9.06489 28.3058 8.42609 27.8127 7.94922 27.1875L1.39844 18.6074C0.920976 17.9818 0.622046 17.2464 0.530273 16.4756V16.4746C0.438359 15.7038 0.556957 14.9224 0.874023 14.209L0.873047 14.208L5.24707 4.41504V4.41406C5.56386 3.70172 6.06888 3.08113 6.71289 2.61621C7.35698 2.15128 8.11733 1.85896 8.91699 1.76953H8.91797L19.8467 0.52832L19.8477 0.529297Z"
                    stroke="white" />
                <mask id="mask0_1551_31" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="6" y="5" width="21"
                    height="20">
                    <path d="M26.2013 5.01746H6.0459V24.7729H26.2013V5.01746Z" fill="white" />
                </mask>
                <g mask="url(#mask0_1551_31)">
                    <path
                        d="M23.7946 10.6905C24.1481 9.87561 24.0948 9.02711 23.5999 8.45543C22.9992 7.7623 21.9206 7.69302 20.9131 8.17814C21.9855 8.88328 22.955 9.72853 23.7946 10.6905Z"
                        fill="none" />
                    <path
                        d="M10.2561 18.5478C10.1735 18.7513 10.0302 18.9257 9.84525 19.0485C9.65995 19.171 9.44175 19.2361 9.21805 19.2355H8.23094C8.18126 19.2367 8.13158 19.228 8.08525 19.2104C8.03893 19.1925 7.99657 19.1659 7.96091 19.1318C7.92525 19.0978 7.89691 19.0572 7.87771 19.012C7.8582 18.9672 7.84814 18.9188 7.84814 18.8702C7.84814 18.8212 7.8582 18.7731 7.87771 18.728C7.89691 18.6832 7.92525 18.6422 7.96091 18.6082C7.99657 18.5741 8.03893 18.5475 8.08525 18.5296C8.13158 18.512 8.18126 18.5036 8.23094 18.5048H9.21805C9.29272 18.5051 9.36555 18.4833 9.42742 18.4424C9.48898 18.4015 9.53683 18.3435 9.56456 18.2757C9.58224 18.2303 9.60907 18.1891 9.6432 18.1541C9.67734 18.1192 9.71817 18.0911 9.76328 18.072C9.80869 18.0526 9.85744 18.0421 9.90681 18.0415C9.95618 18.0406 10.0053 18.0496 10.051 18.0675C10.097 18.0857 10.1387 18.1123 10.1738 18.1464C10.2091 18.1801 10.2372 18.2208 10.2561 18.2653C10.2753 18.3101 10.285 18.3579 10.2853 18.4063C10.2853 18.4546 10.275 18.5033 10.2561 18.5478ZM12.7042 13.7571C12.8886 13.7572 13.0687 13.7037 13.222 13.6033C13.3753 13.503 13.4948 13.3604 13.5655 13.1934C13.6359 13.0265 13.6545 12.8429 13.6185 12.6657C13.5825 12.4885 13.4939 12.3257 13.3634 12.1979C13.2333 12.0702 13.0672 11.9831 12.8865 11.9479C12.7054 11.9126 12.5183 11.9307 12.348 11.9998C12.1776 12.0689 12.0319 12.186 11.9295 12.3362C11.8271 12.4864 11.7726 12.6631 11.7726 12.8437C11.7726 13.0859 11.8707 13.3182 12.0453 13.4895C12.2203 13.6608 12.4571 13.7571 12.7042 13.7571ZM15.6857 11.9306C14.7611 11.9306 14.5922 14.504 14.5703 15.9489H14.0574C13.9931 15.9489 13.93 15.9326 13.8739 15.9016C13.8181 15.8706 13.7712 15.8259 13.7383 15.7719L13.0507 14.6527C12.9514 14.4908 12.8109 14.3568 12.6433 14.2639C12.4753 14.1709 12.2858 14.122 12.0932 14.1221H11.2097C11.1981 14.1213 11.1862 14.1213 11.1746 14.1221H10.1832C9.97569 14.122 9.77211 14.1786 9.59565 14.2856C9.41919 14.3925 9.27626 14.5456 9.18361 14.7276L8.64419 15.7862C8.60244 15.8725 8.59695 15.9715 8.62895 16.0618C8.66064 16.1521 8.72709 16.2266 8.81425 16.2693C8.90172 16.3121 9.00228 16.3197 9.09523 16.2905C9.18788 16.2613 9.26529 16.1976 9.311 16.1131L9.85012 15.0556C9.88121 14.995 9.92877 14.944 9.98759 14.9083C10.0464 14.8727 10.114 14.8538 10.1832 14.8539H10.6373L9.98391 16.4149C9.88426 16.6533 9.87329 16.9186 9.95313 17.1641C10.0333 17.4096 10.1988 17.6196 10.4212 17.7571L11.9585 18.7086V20.3333C11.9572 20.382 11.9658 20.4303 11.9841 20.476C12.002 20.5215 12.0295 20.5627 12.0642 20.5976C12.099 20.6326 12.1404 20.6604 12.1864 20.6795C12.2321 20.6983 12.2815 20.7081 12.3312 20.7081C12.3812 20.7081 12.4302 20.6983 12.4763 20.6795C12.522 20.6604 12.5637 20.6326 12.5985 20.5976C12.6332 20.5627 12.6603 20.5215 12.6783 20.476C12.6966 20.4303 12.7051 20.382 12.7039 20.3333V18.5057C12.7039 18.4442 12.6881 18.3833 12.6576 18.3295C12.6271 18.2754 12.5832 18.2297 12.5302 18.1966L11.7692 17.7258L12.7009 15.4999L13.0995 16.1485C13.1988 16.3105 13.3393 16.4445 13.5073 16.5376C13.6749 16.6305 13.8648 16.6794 14.0574 16.6792H14.9467C14.9951 16.6792 15.043 16.6886 15.0875 16.7068C15.1319 16.725 15.1725 16.7517 15.2066 16.7852C15.2407 16.8189 15.2676 16.8587 15.2859 16.9025C15.3041 16.9463 15.3133 16.9932 15.313 17.0406V17.0479C15.3108 17.1438 15.2706 17.2351 15.2011 17.3025C15.1316 17.3699 15.0381 17.4083 14.9403 17.4095C14.7351 17.4238 14.605 17.5995 14.6193 17.8007C14.8293 20.6971 15.4507 20.6971 15.6845 20.6971C16.6938 20.6971 16.8017 17.6316 16.8017 16.3138C16.8017 14.996 16.6942 11.9306 15.6857 11.9306Z"
                        fill="#fff" />
                    <path class="logo"
                        d="M15.2702 8.08188C14.665 8.11737 14.0664 8.22257 13.4865 8.39535C11.7051 8.90591 10.4943 9.87716 9.82079 10.5206L9.81622 10.5257C9.74795 10.6098 9.6169 10.8058 9.66688 11.0177C9.75099 11.3487 10.2383 11.4959 10.5921 11.4465C10.8436 11.4137 11.0279 11.2665 11.1118 11.1837L11.1142 11.1817C11.6527 10.72 12.5609 10.0613 13.8558 9.68183C14.5065 9.4965 15.1806 9.4022 15.8581 9.40172C17.8436 9.40172 19.6274 10.1934 20.9242 11.4643C21.5907 12.1157 22.1194 12.8894 22.4806 13.7412C22.8414 14.5931 23.0279 15.5063 23.0285 16.4287C23.0285 18.3749 22.2209 20.1233 20.9242 21.3943C19.6274 22.6653 17.8452 23.4569 15.8581 23.4569C14.0719 23.4572 12.3497 22.8045 11.0286 21.6261C10.9079 21.4953 10.7585 21.3928 10.5918 21.3259C10.0536 21.095 9.31305 21.2103 9.22894 21.4908C9.21248 21.5398 9.21248 21.6204 9.27648 21.7647L9.28379 21.7767C9.44532 21.9711 9.61812 22.1566 9.80098 22.3323C11.1977 23.701 12.7291 24.2288 13.2844 24.3949C14.565 24.7856 15.9212 24.8761 17.2439 24.659C18.5665 24.4418 19.8188 23.9232 20.8995 23.1448C21.9802 22.3663 22.8591 21.3498 23.4656 20.1773C24.0717 19.0049 24.3887 17.7091 24.3905 16.3946C24.3905 14.0854 23.4311 12.0238 21.8832 10.5064C20.5432 9.19319 18.7954 8.35422 16.9153 8.12161C16.9028 8.12009 16.891 8.11408 16.8824 8.1047C16.8739 8.09535 16.869 8.08325 16.8687 8.07068L16.8754 7.16336V7.14989C16.8754 7.13597 16.8812 7.12262 16.8913 7.11279C16.901 7.10293 16.9147 7.09741 16.929 7.09741H18.4739C18.5361 7.09753 18.5973 7.08564 18.6546 7.06246C18.7116 7.03928 18.7637 7.00525 18.8076 6.96236C18.8512 6.91943 18.8859 6.86847 18.9097 6.81237C18.9332 6.7563 18.9453 6.69617 18.9453 6.6355V5.5316C18.9447 5.39533 18.8893 5.26482 18.7911 5.16849C18.6927 5.07215 18.5595 5.01787 18.4205 5.01746H13.6785C13.6166 5.01737 13.555 5.02923 13.498 5.05241C13.4407 5.07559 13.3889 5.10958 13.3451 5.15248C13.3012 5.19534 13.2667 5.2463 13.243 5.30234C13.2192 5.35841 13.2073 5.41848 13.2073 5.47915V6.58126C13.2076 6.71753 13.2631 6.84813 13.3612 6.94453C13.4596 7.04089 13.5928 7.09523 13.7318 7.09564H15.2233C15.2303 7.09564 15.2373 7.09699 15.2437 7.09962C15.2504 7.10228 15.2562 7.10613 15.2611 7.111C15.2663 7.11587 15.2702 7.12166 15.2727 7.12803C15.2754 7.13439 15.2769 7.1412 15.2769 7.1481V7.1616"
                        fill="none" />
                </g>
            </g>
            <defs>
                <clipPath id="clip0_1551_31">
                    <rect width="32" height="30" fill="white" />
                </clipPath>
            </defs>
        </svg>
    </div>
            <h3 class="loadMessage" id="loadingText">Đang tải...</h3> `;
    document.body.appendChild(this.loadingScreenElement);
    this.loadingTextElement =
      this.loadingScreenElement.querySelector("#loadingText");
  }

  /**
   * Sets up event listeners for the confirm popup.
   * @param {HTMLElement} overlay The confirm popup overlay element.
   */
  _setupConfirmPopupEvents(overlay) {
    const exitBtn = overlay.querySelector(".exitBtn");
    const btnOK = overlay.querySelector(".vc-btn-ok");
    const btnCancel = overlay.querySelector(".vc-btn-cancel");

    const closePopup = () => {
      overlay.classList.remove("active");
      overlay.removeEventListener("click", overlayCloseHandler); // Remove overlay click listener
      document.body.style.overflow = ""; // Restore body scroll
      // Clean up old event listeners to prevent memory leaks/multiple calls
      btnOK.onclick = null;
      btnCancel.onclick = null;
    };

    // Handler for clicking the overlay itself (outside the popup content)
    const overlayCloseHandler = (event) => {
      if (event.target === overlay) {
        closePopup();
        // Call the current onCancel if it's set for external clicks
        if (overlay._onCancelCallback) {
          overlay._onCancelCallback();
        }
      }
    };

    exitBtn.addEventListener("click", closePopup);
    // Delay adding overlay click listener to prevent immediate closing
    // after the event that triggered the popup shows up
    setTimeout(() => {
      overlay.addEventListener("click", overlayCloseHandler);
    }, 100);
  }

  /**
   * NEW: Sets up event listeners for the three-option popup.
   * @param {HTMLElement} overlay The three-option popup overlay element.
   */
  _setupThreeOptionPopupEvents(overlay) {
    const exitBtn = overlay.querySelector(".exitBtn");
    const btnOK = overlay.querySelector(".vc-btn-ok");
    const btnCancel = overlay.querySelector(".vc-btn-cancel");
    const btnThird = overlay.querySelector(".vc-btn-third");

    const closePopup = () => {
      overlay.classList.remove("active");
      overlay.removeEventListener("click", overlayCloseHandler);
      document.body.style.overflow = "";
      btnOK.onclick = null;
      btnCancel.onclick = null;
      btnThird.onclick = null;
    };

    const overlayCloseHandler = (event) => {
      if (event.target === overlay) {
        closePopup();
        if (overlay._onCancelCallback) {
          // Default to cancel if clicked outside
          overlay._onCancelCallback();
        }
      }
    };

    exitBtn.addEventListener("click", closePopup);
    setTimeout(() => {
      overlay.addEventListener("click", overlayCloseHandler);
    }, 100);
  }

  _setupFullscreenImageOverlayEvents() {
    // Đóng khi click nút "Đóng"
    this.closeImageOverlayButton.addEventListener("click", () => {
      this.hideFullscreenImage();
    });

    this.saveImageButton.addEventListener("click", () => {
      this._saveImage(this.fullscreenImage.src);
    });
    this.copyImageButton.addEventListener("click", () => {
      this._copyImage(this.fullscreenImage.src);
    });
    this.shareImageButton.addEventListener("click", () => {
      this._shareImage(this.fullscreenImage.src);
    });

    // Đóng khi click vào ảnh (tùy chọn, giống điện thoại)
    this.fullscreenImage.addEventListener("click", (event) => {
      // Đảm bảo chỉ đóng khi click trực tiếp vào ảnh, không phải khoảng trống
      if (event.target === this.fullscreenImage) {
        this.hideFullscreenImage();
      }
    });

    // Đóng khi click vào overlay nhưng không phải ảnh hoặc nút đóng
    this.fullscreenImageOverlay.addEventListener("click", (event) => {
      if (event.target === this.fullscreenImageOverlay) {
        this.hideFullscreenImage();
      }
    });

    // Đóng bằng phím ESC
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        this.fullscreenImageOverlay.style.display === "flex"
      ) {
        this.hideFullscreenImage();
      }
    });
  }

  // Trong class UIElements_VaoCa
  _saveImage(imageSrc) {
    // 1. Kiểm tra ảnh dự phòng (fallback image)
    // Nếu imageSrc là ảnh dự phòng (ví dụ: ảnh camera mặc định khi không tìm thấy ảnh chấm công),
    // chúng ta sẽ không cho phép lưu để tránh lưu ảnh không mong muốn.
    if (!imageSrc || imageSrc.startsWith("https://st5.depositphotos.com")) {
      this.showAlert({
        type: "warning",
        message: "Không thể lưu ảnh dự phòng.",
      });
      return; // Dừng hàm nếu là ảnh dự phòng
    }

    try {
      // 2. Tạo một thẻ <a> ẩn
      const link = document.createElement("a");
      // Gán nguồn ảnh cho thuộc tính href của thẻ <a>.
      // Nếu imageSrc là Base64 Data URL, trình duyệt sẽ hiểu và tải xuống.
      link.href = imageSrc;
      // Đặt tên file khi tải xuống. Sử dụng Date.now() để đảm bảo tên file là duy nhất.
      // Có thể đổi đuôi file (.png, .jpg) tùy thuộc vào định dạng ảnh Base64 của bạn.
      link.download = `image_${Date.now()}.png`;

      // 3. Thêm thẻ <a> vào DOM (phải có trong DOM mới click được)
      document.body.appendChild(link);
      // 4. Kích hoạt sự kiện click trên thẻ <a> để bắt đầu tải xuống
      link.click();
      // 5. Xóa thẻ <a> khỏi DOM sau khi đã click xong để giữ DOM sạch sẽ
      document.body.removeChild(link);

      // 6. Hiển thị thông báo thành công cho người dùng
      this.showAlert({ type: "success", message: "Ảnh đã được lưu!" });
    } catch (error) {
      // 7. Xử lý lỗi nếu có vấn đề trong quá trình lưu ảnh
      console.error("Lỗi khi lưu ảnh:", error);
      this.showAlert({ type: "error", message: "Không thể lưu ảnh." });
    }
  }

  // Trong class UIElements_VaoCa
  _copyImage(imageSrc) {
    // 2. Kiểm tra xem trình duyệt có hỗ trợ Web Clipboard API không
    if (navigator.clipboard && navigator.clipboard.write) {
      // 3. Chuyển đổi Data URL (Base64) thành Blob
      // Dùng fetch API để lấy dữ liệu ảnh từ Data URL và chuyển đổi nó thành Blob.
      fetch(imageSrc)
        .then((res) => res.blob()) // Lấy phản hồi dưới dạng Blob
        .then((blob) => {
          // 4. Tạo một ClipboardItem từ Blob
          // ClipboardItem là một phần của Clipboard API, cho phép sao chép các loại dữ liệu phức tạp.
          // Chúng ta chỉ định loại MIME của Blob là key và Blob là value.
          const item = new ClipboardItem({ [blob.type]: blob });

          // 5. Ghi ClipboardItem vào clipboard
          navigator.clipboard
            .write([item])
            .then(() => {
              this.showAlert({
                type: "success",
                message: "Ảnh đã được sao chép!",
              });
            })
            .catch((err) => {
              // Xử lý lỗi nếu việc ghi vào clipboard thất bại
              console.error("Lỗi khi sao chép ảnh:", err);
              this.showAlert({
                type: "error",
                message: "Không thể sao chép ảnh.",
              });
            });
        })
        .catch((err) => {
          // Xử lý lỗi nếu việc chuyển đổi ảnh sang Blob thất bại
          console.error("Lỗi khi chuyển đổi ảnh để sao chép:", err);
          this.showAlert({ type: "error", message: "Không thể sao chép ảnh." });
        });
    } else {
      // 6. Thông báo nếu trình duyệt không hỗ trợ API
      this.showAlert({
        type: "warning",
        message: "Trình duyệt không hỗ trợ sao chép ảnh.",
      });
    }
  }

  // Trong class UIElements_VaoCa
  _shareImage(imageSrc) {
    // 1. Kiểm tra ảnh dự phòng
    if (!imageSrc || imageSrc.startsWith("https://st5.depositphotos.com")) {
      this.showAlert({
        type: "warning",
        message: "Không thể chia sẻ ảnh dự phòng.",
      });
      return;
    }

    // 2. Kiểm tra xem trình duyệt có hỗ trợ Web Share API không
    if (navigator.share) {
      // 3. Chuyển đổi Data URL (Base64) thành Blob và sau đó thành File object
      fetch(imageSrc)
        .then((res) => res.blob()) // Lấy dữ liệu ảnh dưới dạng Blob
        .then((blob) => {
          // Tạo một đối tượng File từ Blob.
          // File object là cần thiết cho Web Share API khi chia sẻ file.
          const file = new File([blob], `image_${Date.now()}.png`, {
            type: blob.type,
          });

          // 4. Gọi navigator.share() để mở giao diện chia sẻ của hệ điều hành
          navigator
            .share({
              files: [file], // Mảng chứa các File để chia sẻ
              title: "Chia sẻ ảnh", // Tiêu đề của chia sẻ
              text: "Xem ảnh này từ ứng dụng của chúng tôi!", // Nội dung text đi kèm
            })
            .then(() => {
              this.showAlert({
                type: "success",
                message: "Ảnh đã được chia sẻ!",
              });
            })
            .catch((error) => {
              // Xử lý lỗi hoặc khi người dùng hủy chia sẻ
              if (error.name === "AbortError") {
                console.log("Chia sẻ bị hủy."); // Người dùng đóng giao diện chia sẻ
              } else {
                console.error("Lỗi khi chia sẻ ảnh:", error);
                this.showAlert({
                  type: "error",
                  message: "Không thể chia sẻ ảnh.",
                });
              }
            });
        })
        .catch((err) => {
          // Xử lý lỗi nếu việc chuẩn bị ảnh để chia sẻ thất bại
          console.error("Lỗi khi chuẩn bị ảnh để chia sẻ:", err);
          this.showAlert({ type: "error", message: "Không thể chia sẻ ảnh." });
        });
    } else {
      // 5. Thông báo nếu trình duyệt không hỗ trợ API
      this.showAlert({
        type: "warning",
        message: "Trình duyệt không hỗ trợ chia sẻ.",
      });
    }
  }

  /**
   * Sets up event listeners for the info/success/error popup.
   * @param {HTMLElement} overlay The info popup overlay element.
   */
  _setupInfoPopupEvents(overlay) {
    const exitBtn = overlay.querySelector(".exitBtn");
    const btnOK = overlay.querySelector(".vc-btn-ok");

    const closePopup = () => {
      overlay.classList.remove("active");
      overlay.removeEventListener("click", overlayCloseHandler);
      document.body.style.overflow = "";
      btnOK.onclick = null;
    };

    const overlayCloseHandler = (event) => {
      if (event.target === overlay) {
        closePopup();
        if (overlay._onOkCallback) {
          // Call onOk for info popups if defined for overlay click
          overlay._onOkCallback();
        }
      }
    };

    exitBtn.addEventListener("click", closePopup);
    setTimeout(() => {
      overlay.addEventListener("click", overlayCloseHandler);
    }, 100);
  }

  /**
   * Displays an image in full-screen overlay mode.
   * @param {string} imageSrc - The source of the image (URL or Base64 data URL).
   */
  showFullscreenImage(imageSrc) {
    if (!this.fullscreenImageOverlay || !this.fullscreenImage) {
      console.error("Fullscreen image overlay not initialized.");
      return;
    }
    this.fullscreenImage.src = imageSrc;
    this.fullscreenImageOverlay.classList.add("active"); // Sử dụng class active
    document.body.style.overflow = "hidden"; // Ngăn cuộn trang chính
  }

  /**
   * Hides the full-screen image overlay.
   */
  hideFullscreenImage() {
    if (!this.fullscreenImageOverlay || !this.fullscreenImage) {
      return;
    }
    this.fullscreenImageOverlay.classList.remove("active"); // Xóa class active
    this.fullscreenImage.src = ""; // Xóa src để giải phóng bộ nhớ
    document.body.style.overflow = ""; // Khôi phục cuộn trang chính
  }

  /**
   * Helper to show a popup/loading overlay and apply `active` class.
   * @param {HTMLElement} element - The overlay element (popup or loading).
   */
  _activateOverlay(element) {
    element.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  }

  /**
   * Helper to hide a popup/loading overlay.
   * @param {HTMLElement} element - The overlay element (popup or loading).
   */
  _deactivateOverlay(element) {
    element.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  }

  _setupGlobalImageClickListener() {
    const handleImageActivation = (event) => {
      const clickedElement = event.target;

      if (
        clickedElement.tagName === "IMG" &&
        clickedElement.id !== "fullscreenImage" &&
        clickedElement.src &&
        clickedElement.src !== window.location.href &&
        clickedElement.id !== "fullscreenLogo1" &&
        clickedElement.id !== "fullscreenLogo2"
      ) {
        event.preventDefault();
        console.log("View Image By Vu");
        this.showFullscreenImage(clickedElement.src);
      }
    };

    document.body.addEventListener("click", handleImageActivation);
    document.body.addEventListener("touchend", handleImageActivation);
  }

  /**
   * Displays a confirmation popup with custom title, content, and callbacks.
   * @param {Object} options - Options for the popup.
   * @param {string} [options.title="Thông báo"] - The title of the popup.
   * @param {string} [options.content="Nội dung popup"] - The main content of the popup.
   * @param {string} [options.iconSvg=''] - SVG string for the icon.
   * @param {string} [options.confirmText="Đồng ý"] - Text for the confirm button.
   * @param {string} [options.cancelText="Hủy"] - Text for the cancel button.
   * @param {Function} [options.onConfirm=null] - Callback function when 'Đồng ý' is clicked.
   * @param {Function} [options.onCancel=null] - Callback function when 'Hủy' is clicked or popup is closed.
   */
  showConfirmPopup({
    title = "Thông báo",
    content = "Nội dung popup",
    iconSvg = "",
    confirmText = "Đồng ý", // New option for custom confirm button text
    cancelText = "Hủy", // New option for custom cancel button text
    onConfirm = null,
    onCancel = null,
  }) {
    const overlay = this.confirmPopupOverlay;
    const titleEl = overlay.querySelector(".vc-popup-title");
    const contentEl = overlay.querySelector(".vc-popup-content");
    const iconEl = overlay.querySelector(".Vu-VC-popup-icon");
    const btnOK = overlay.querySelector(".vc-btn-ok");
    const btnCancel = overlay.querySelector(".vc-btn-cancel");

    titleEl.textContent = title;
    contentEl.innerHTML = content;
    iconEl.innerHTML = iconSvg;
    btnOK.textContent = confirmText; // Set custom text
    btnCancel.textContent = cancelText; // Set custom text

    overlay._onConfirmCallback = onConfirm;
    overlay._onCancelCallback = onCancel;

    const closePopup = () => {
      this._deactivateOverlay(overlay);
      overlay._onConfirmCallback = null;
      overlay._onCancelCallback = null;
    };

    btnOK.onclick = () => {
      if (overlay._onConfirmCallback) overlay._onConfirmCallback();
      closePopup();
    };

    btnCancel.onclick = () => {
      if (overlay._onCancelCallback) overlay._onCancelCallback();
      closePopup();
    };

    this._activateOverlay(overlay);
  }

  /**
   * Displays an informational popup.
   * @param {Object} options - Options for the popup.
   * @param {string} [options.title="Thông báo"] - The title of the popup.
   * @param {string} [options.content="Nội dung popup"] - The main content of the popup.
   * @param {string} [options.iconSvg=''] - SVG string for the icon.
   * @param {string} [options.okText="Đã hiểu"] - Text for the OK button. // NEW: Tham số okText
   * @param {Function} [options.onOk=null] - Callback function when 'OK' is clicked or popup is closed.
   * @param {number} [options.timeout=0] - Duration in milliseconds after which the popup automatically closes. If 0, it stays open until manually closed.
   */
  showInfoPopup({
    title = "Thông báo",
    content = "Nội dung popup",
    iconSvg = "",
    okText = "Đã hiểu",
    onOk = null,
    timeout = 0,
  }) {
    const overlay = this.infoPopupOverlay;
    const titleEl = overlay.querySelector(".vc-popup-title");
    const contentEl = overlay.querySelector(".vc-popup-content");
    const iconEl = overlay.querySelector(".Vu-VC-popup-icon");
    const btnOK = overlay.querySelector(".vc-btn-ok");

    titleEl.textContent = title;
    contentEl.innerHTML = content;
    iconEl.innerHTML = iconSvg;
    btnOK.textContent = okText; // NEW: Gán văn bản tùy chỉnh cho nút OK

    overlay._onOkCallback = onOk;

    // Clear any existing timeout to prevent unexpected behavior if popup is re-used
    if (overlay._timeoutId) {
      clearTimeout(overlay._timeoutId);
      overlay._timeoutId = null;
    }

    const closePopup = () => {
      this._deactivateOverlay(overlay);
      overlay._onOkCallback = null;
      if (overlay._timeoutId) {
        // Clear timeout when closed manually as well
        clearTimeout(overlay._timeoutId);
        overlay._timeoutId = null;
      }
    };

    btnOK.onclick = () => {
      if (overlay._onOkCallback) overlay._onOkCallback();
      closePopup();
    };

    this._activateOverlay(overlay);

    // Tự động đóng popup sau thời gian timeout
    if (timeout > 0) {
      overlay._timeoutId = setTimeout(() => {
        closePopup();
        if (overlay._onOkCallback) overlay._onOkCallback(); // Call onOk when auto-closed
      }, timeout);
    }
  }

  /**
   * Displays a popup with three options (confirm, cancel, and a third custom option).
   * @param {Object} options - Options for the popup.
   * @param {string} [options.title="Thông báo"] - The title of the popup.
   * @param {string} [options.content="Nội dung popup"] - The main content of the popup.
   * @param {string} [options.iconSvg=''] - SVG string for the icon.
   * @param {string} [options.confirmText="Đồng ý"] - Text for the primary confirm button.
   * @param {string} [options.cancelText="Hủy"] - Text for the cancel button.
   * @param {string} [options.thirdOptionText="Tùy chọn khác"] - Text for the third custom button.
   * @param {Function} [options.onConfirm=null] - Callback function when the primary confirm button is clicked.
   * @param {Function} [options.onCancel=null] - Callback function when the cancel button or exit button is clicked, or overlay is clicked.
   * @param {Function} [options.onThirdOption=null] - Callback function when the third custom button is clicked.
   */
  showThreeOptionPopup({
    title = "Thông báo",
    content = "Nội dung popup",
    iconSvg = "",
    confirmText = "Đồng ý",
    cancelText = "Hủy",
    thirdOptionText = "Tùy chọn khác",
    onConfirm = null,
    onCancel = null,
    onThirdOption = null,
  }) {
    const overlay = this.threeOptionPopupOverlay;
    const titleEl = overlay.querySelector(".vc-popup-title");
    const contentEl = overlay.querySelector(".vc-popup-content");
    const iconEl = overlay.querySelector(".Vu-VC-popup-icon");
    const btnOK = overlay.querySelector(".vc-btn-ok");
    const btnCancel = overlay.querySelector(".vc-btn-cancel");
    const btnThird = overlay.querySelector(".vc-btn-third");

    titleEl.textContent = title;
    contentEl.innerHTML = content;
    iconEl.innerHTML = iconSvg;
    btnOK.textContent = confirmText;
    btnCancel.textContent = cancelText;
    btnThird.textContent = thirdOptionText;

    overlay._onConfirmCallback = onConfirm;
    overlay._onCancelCallback = onCancel;
    overlay._onThirdOptionCallback = onThirdOption;

    const closePopup = () => {
      this._deactivateOverlay(overlay);
      overlay._onConfirmCallback = null;
      overlay._onCancelCallback = null;
      overlay._onThirdOptionCallback = null;
    };

    btnOK.onclick = () => {
      if (overlay._onConfirmCallback) overlay._onConfirmCallback();
      closePopup();
    };

    btnCancel.onclick = () => {
      if (overlay._onCancelCallback) overlay._onCancelCallback();
      closePopup();
    };

    btnThird.onclick = () => {
      if (overlay._onThirdOptionCallback) overlay._onThirdOptionCallback();
      closePopup();
    };

    this._activateOverlay(overlay);
  }

  /**
   * Displays a fast alert message at the bottom right of the screen.
   * @param {Object} options - Options for the alert.
   * @param {'error'|'success'|'notice'|'warning'} options.type - Type of alert (determines color and icon).
   * @param {string} options.message - The message to display.
   * @param {number} [options.duration=5000] - Duration in milliseconds before the alert fades out.
   */
  showAlert({ type, message, duration = 3500 }) {
    const alertSvgIcons = {
      error: `<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z" fill="#393a37"></path></svg>`,
      success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`,
      notice: `<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z" fill="#393a37"></path></svg>`,
      warning: `<svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z" fill="#393a37"></path></svg>`,
    };

    if (!alertSvgIcons[type]) {
      console.warn(`Unknown alert type: ${type}. Defaulting to 'notice'.`);
      type = "notice";
    }

    const alertElement = document.createElement("div");
    alertElement.classList.add("alertFastMessgeByVu", type);
    alertElement.innerHTML = `
            <div class="iconAlert">
                ${alertSvgIcons[type]}
            </div>
            <div class="alertMessage">${message}</div>
        `;

    this.alertContainer.appendChild(alertElement);

    // Remove the alert after its duration
    setTimeout(() => {
      alertElement.style.animation = `fadeOut 0.5s ease-in forwards`;
      alertElement.addEventListener(
        "animationend",
        (event) => {
          if (event.animationName === "fadeOut") {
            alertElement.remove();
          }
        },
        { once: true }
      );
    }, duration);
  }

  /**
   * Shows the loading screen with an optional custom message.
   * @param {string} [message="Đang tải..."] - The message to display on the loading screen.
   */
  showLoading(message = "Đang tải...") {
    if (this.loadingTextElement) {
      this.loadingTextElement.textContent = message;
    }
    this._activateOverlay(this.loadingScreenElement);
  }

  /**
   * Hides the loading screen.
   */
  hideLoading() {
    this._deactivateOverlay(this.loadingScreenElement);
  }
}

// Export a singleton instance of the UIElements class
export const uiManager = new UIElements_VaoCa();
