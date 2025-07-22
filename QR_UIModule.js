// qrCodeDisplayModule.js

/**
 * Import html2canvas library
 *
 * Option 1: CDN (add to your HTML head)
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
 *
 * Option 2: NPM
 * npm install html2canvas
 * import html2canvas from 'html2canvas';
 *
 * Option 3: Dynamic import (used in this module)
 */

/**
 * Creates and initializes a self-contained QR code display module.
 * The module injects its own HTML and CSS into the document.
 *
 * @param {string} userName - The name of the user to display on the QR card.
 * @param {string} qrImageUrl - The URL for the QR code image.
 * @param {string} [targetElementId='qr-display-container'] - The ID of the HTML element where the QR display will be rendered.
 */

/**
 * Cache và optimization variables
 */
let cachedQrImageUrl = null;

/**
 * Creates and initializes a self-contained QR code display module with performance optimizations.
 */
export function createQrDisplayModule(userName, qrImageUrl, targetElementId = 'qr-display-container') {
    const htmlContent = `
        <div class="qr-popup-overlay">
        <div class="containerQRByVu">
            <div class="header">
                <div class="close-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#111" class="bi bi-x-lg"
                        viewBox="0 0 16 16">
                        <path stroke-width="3"
                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                </div>
            </div>

            <!-- Container for displaying QR image -->
            <div class="qr-full-content" id="qr-full-content">
                <div class="qr-section">
                    <div class="qr-code-container">
                        <img src="${qrImageUrl}" alt="QR Code" class="qr-image" loading="eager" crossorigin="anonymous">
                    </div>
                    <div class="user-info">
                        <span class="user-name">${userName}</span>
                    </div>
                    <div class="qr-description">
                        QR đồng bộ dữ liệu và kết nối nhân sự trên Vào Ca <br> Ứng dụng quản trị nhân sự toàn diện trên điện
                        thoại.
                    </div>
                </div>

                <div class="activation-section">
                    <div class="activation-header">
                        <div class="activation-title">Kích hoạt hồ sơ nhân viên</div>
                    </div>
                    <div class="activation-details">
                        Tải ứng dụng <span class="highlight">Vào Ca</span> về điện thoại, sau đó đăng nhập vào ứng dụng, mở chức
                        năng quét QR và thực hiện đồng bộ nhân sự trên ứng dụng.
                    </div>
                </div>
            </div>

            <div class="action-buttons">
                <div class="action-item" data-action="download">
                    <svg style="margin-bottom: 4px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                        height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <rect x="0" y="0" width="24" height="24" />
                            <path
                                d="M2,13 C2,12.5 2.5,12 3,12 C3.5,12 4,12.5 4,13 C4,13.3333333 4,15 4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 C2,15 2,13.3333333 2,13 Z"
                                fill="#004c39" fill-rule="nonzero" />
                            <rect fill="#73C41D"
                                transform="translate(12.000000, 8.000000) rotate(-180.000000) translate(-12.000000, -8.000000) "
                                x="11" y="1" width="2" height="14" rx="1" />
                            <path
                                d="M7.70710678,15.7071068 C7.31658249,16.0976311 6.68341751,16.0976311 6.29289322,15.7071068 C5.90236893,15.3165825 5.90236893,14.6834175 6.29289322,14.2928932 L11.2928932,9.29289322 C11.6689749,8.91681153 12.2736364,8.90091039 12.6689647,9.25670585 L17.6689647,13.7567059 C18.0794748,14.1261649 18.1127532,14.7584547 17.7432941,15.1689647 C17.3738351,15.5794748 16.7415453,15.6127532 16.3310353,15.2432941 L12.0362375,11.3779761 L7.70710678,15.7071068 Z"
                                fill="#73C41D" fill-rule="nonzero"
                                transform="translate(12.000004, 12.499999) rotate(-180.000000) translate(-12.000004, -12.499999) " />
                        </g>
                    </svg>
                    <span>Tải xuống</span>
                </div>
                <div class="action-item" data-action="share">
                    <svg style="margin-bottom: 4px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                        height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <rect x="0" y="0" width="24" height="24" />
                            <path
                                d="M10.9,2 C11.4522847,2 11.9,2.44771525 11.9,3 C11.9,3.55228475 11.4522847,4 10.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,16 C20,15.4477153 20.4477153,15 21,15 C21.5522847,15 22,15.4477153 22,16 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L10.9,2 Z"
                                fill="#004c39" fill-rule="nonzero" />
                            <path
                                d="M24.0690576,13.8973499 C24.0690576,13.1346331 24.2324969,10.1246259 21.8580869,7.73659596 C20.2600137,6.12944276 17.8683518,5.85068794 15.0081639,5.72356847 L15.0081639,1.83791555 C15.0081639,1.42370199 14.6723775,1.08791555 14.2581639,1.08791555 C14.0718537,1.08791555 13.892213,1.15726043 13.7542266,1.28244533 L7.24606818,7.18681951 C6.93929045,7.46513642 6.9162184,7.93944934 7.1945353,8.24622707 C7.20914339,8.26232899 7.22444472,8.27778811 7.24039592,8.29256062 L13.7485543,14.3198102 C14.0524605,14.6012598 14.5269852,14.5830551 14.8084348,14.2791489 C14.9368329,14.140506 15.0081639,13.9585047 15.0081639,13.7695393 L15.0081639,9.90761477 C16.8241562,9.95755456 18.1177196,10.0730665 19.2929978,10.4469645 C20.9778605,10.9829796 22.2816185,12.4994368 23.2042718,14.996336 L23.2043032,14.9963244 C23.313119,15.2908036 23.5938372,15.4863432 23.9077781,15.4863432 L24.0735976,15.4863432 C24.0735976,15.0278051 24.0690576,14.3014082 24.0690576,13.8973499 Z"
                                fill="#73C41D" fill-rule="nonzero"
                                transform="translate(15.536799, 8.287129) scale(-1, 1) translate(-15.536799, -8.287129) " />
                        </g>
                    </svg>
                    <span>Chia sẻ</span>
                </div>
            </div>
        </div>
        </div>
    `;

    const cssContent = `
        .qr-popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1999;
        }
    
        .containerQRByVu {
            width: calc(100% - 40px);
            margin: 30px 20px;
            background: linear-gradient(290deg, #EAF6FF 9.78%, #F3FFE9 109.56%);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            position: relative;
            border-radius: 32px;
            z-index: 2000;
            will-change: transform;
        }

        .containerQRByVu .header {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 10px 15px;
            padding-bottom: 0;
            margin: 5px;
            margin-bottom: 0px;
            font-size: 20px;
            color: #333;
        }

        .containerQRByVu .header .close-icon {
            background-color: #fff;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            cursor: pointer;
        }

        .qr-full-content {
            width: 100%;
            background: linear-gradient(290deg, #EAF6FF 9.78%, #F3FFE9 109.56%);
            padding: 10px 20px;
            box-sizing: border-box;
            transform: translateZ(0);
        }

        .containerQRByVu .qr-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: transparent;
        }

        .containerQRByVu .qr-code-container {
            position: relative;
            width: 240px;
            height: 240px;
            border: 3px solid #004c39;
            background-color: #004c39;
            border-radius: 16px;
            margin-bottom: 20px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .containerQRByVu .qr-image {
            width: 90%;
            height: 90%;
            object-fit: contain;
            will-change: contents;
        }

        .containerQRByVu .user-info {
            font-size: 1.2rem;
            color: #004c39;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .containerQRByVu .qr-description {
            font-size: 0.7rem;
            margin-top: 5px;
            color: #666;
            text-align: center;
            padding: 0 20px;
        }

        .containerQRByVu .activation-section {
            background-color: #f9f9f9;
            padding: 15px;
            margin: 10px 0;
            border-radius: 10px;
            border: 1px solid #fff;
        }

        .containerQRByVu .activation-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .containerQRByVu .activation-title {
            font-weight: bold;
            font-size: 0.8rem;
            color: #004c39;
        }

        .containerQRByVu .activation-details {
            font-size: 0.6rem;
            color: #555;
            line-height: 1.5;
        }

        .containerQRByVu .activation-details .highlight {
            color: #28a745;
            font-weight: bold;
        }

        .containerQRByVu .action-buttons {
            display: flex;
            justify-content: space-around;
            padding: 10px 0;
            border-top: 1px solid #eee;
        }

        .containerQRByVu .action-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
            color: #555;
            cursor: pointer;
            transition: opacity 0.2s ease;
        }

        .containerQRByVu .action-item:hover {
            opacity: 0.7;
        }

        .containerQRByVu .action-item.loading {
            pointer-events: none;
        }

        .containerQRByVu .action-item.loading span {
            opacity: 0.6;
        }

        .containerQRByVu .action-item.loading span::before {
            content: '';
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-right: 6px;
            border: 2px solid #004c39;
            border-top: 2px solid transparent;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            vertical-align: middle;
        }

        .containerQRByVu .action-item.disabled {
            opacity: 0.5;
            pointer-events: none;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    // Cache CSS injection
    function injectCss(css) {
        const existingStyle = document.querySelector('#qr-module-styles');
        if (!existingStyle) {
            const style = document.createElement('style');
            style.id = 'qr-module-styles';
            style.textContent = css;
            document.head.appendChild(style);
        }
    }

    // Preload QR image để tối ưu tốc độ
    function preloadQrImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }

    // Optimized share function using qrImageUrl directly
    async function shareQrImage(button) {
        if (typeof apimobileAjax !== 'function') {
            if (typeof MainToast !== 'undefined' && MainToast.ShowToast) {
                MainToast.ShowToast('Chức năng chia sẻ hiện chỉ hỗ trợ trong ứng dụng di động!', 'error');
            }
            return;
        }

        const originalText = button.querySelector('span').textContent;

        try {
            button.classList.add('loading');
            button.querySelector('span').textContent = 'Đang chia sẻ...';

            if (typeof MainLoadPanel !== 'undefined' && MainLoadPanel.ShowLoadPanel) {
                MainLoadPanel.ShowLoadPanel('Đang chia sẻ...');
            }

            // Use qrImageUrl directly
            let filePath = qrImageUrl.replace(/^data:image\/png;base64,/, '');
            let filePathR = '';

            await new Promise((resolve, reject) => {
                apimobileAjax(
                    {
                        success: function (data) {
                            filePathR = data;
                            resolve(data);
                        },
                        error: reject,
                    },
                    {
                        MethodName: 'MergeFileSplit',
                        prs: [filePath, 0, 1, 'ScanQrDevice.jpg', 'ScanQrDevice.jpg', ''],
                    }
                );
            });

            const fileName = 'ScanQrDevice.jpg';
            const tmpData = {
                MethodName: 'MobileShareFileAsync',
                prs: [filePathR, fileName],
            };

            await new Promise((resolve, reject) => {
                apimobileAjax(
                    {
                        success: (res) => {
                            console.log('✅ Chia sẻ thành công:', res);
                            if (typeof MainToast !== 'undefined' && MainToast.ShowToast) {
                                MainToast.ShowToast('Chia sẻ thành công!', 'success');
                            }
                            resolve(res);
                        },
                        error: (err) => {
                            console.error('❌ Chia sẻ thất bại:', err);
                            if (typeof MainToast !== 'undefined' && MainToast.ShowToast) {
                                MainToast.ShowToast('Chia sẻ thất bại!', 'error');
                            }
                            reject(err);
                        },
                    },
                    tmpData
                );
            });

            button.querySelector('span').textContent = 'Thành công!';
            setTimeout(() => {
                button.querySelector('span').textContent = originalText;
            }, 2000);
        } catch (error) {
            console.error('Lỗi khi chia sẻ QR:', error);
            button.querySelector('span').textContent = 'Lỗi chia sẻ';
            if (typeof MainToast !== 'undefined' && MainToast.ShowToast) {
                MainToast.ShowToast('Lỗi khi chia sẻ QR: ' + error.message, 'error');
            }
            setTimeout(() => {
                button.querySelector('span').textContent = originalText;
            }, 2000);
        } finally {
            button.classList.remove('loading');
            if (typeof MainLoadPanel !== 'undefined' && MainLoadPanel.HideLoadPanel) {
                MainLoadPanel.HideLoadPanel();
            }
        }
    }

    // Optimized download function using qrImageUrl directly
    async function downloadQrImage(button) {
        const originalText = button.querySelector('span').textContent;

        try {
            button.classList.add('loading');
            button.querySelector('span').textContent = 'Đang tải...';

            if (typeof MainLoadPanel !== 'undefined' && MainLoadPanel.ShowLoadPanel) {
                MainLoadPanel.ShowLoadPanel('Đang tải QR code...');
            }

            // Use qrImageUrl directly or fetch content if needed
            const fileName = `QRCode_${userName}_${new Date().toISOString().split('T')[0]}.png`;
            const tmpData = {
                MethodName: 'AddMediaToPhotosLibrary',
                prs: [qrImageUrl, fileName], // Gửi URL trực tiếp, yêu cầu server xử lý
            };

            await new Promise((resolve, reject) => {
                apimobileAjax(
                    {
                        success: (res) => {
                            button.querySelector('span').textContent = 'Thành công!';
                            if (typeof MainToast !== 'undefined' && MainToast.ShowToast) {
                                MainToast.ShowToast('Lưu ảnh thành công!', 'success');
                            }
                            resolve(res);
                        },
                        error: (err) => {
                            console.error('❌ Lỗi khi lưu ảnh:', err);
                            button.querySelector('span').textContent = 'Lỗi tải xuống';
                            if (typeof MainToast !== 'undefined' && MainToast.ShowToast) {
                                MainToast.ShowToast('Lưu ảnh không thành công!', 'error');
                            }
                            reject(err);
                        },
                    },
                    tmpData
                );
            });

            setTimeout(() => {
                button.querySelector('span').textContent = originalText;
            }, 2000);
        } catch (error) {
            console.error('❌ Download error:', error);
            button.querySelector('span').textContent = 'Lỗi tải xuống';
            if (typeof MainToast !== 'undefined' && MainToast.ShowToast) {
                MainToast.ShowToast('Lỗi tải xuống: ' + error.message, 'error');
            }
            setTimeout(() => {
                button.querySelector('span').textContent = originalText;
            }, 2000);
        } finally {
            button.classList.remove('loading');
            if (typeof MainLoadPanel !== 'undefined' && MainLoadPanel.HideLoadPanel) {
                MainLoadPanel.HideLoadPanel();
            }
        }
    }

    // Optimized event listener setup với event delegation
    function setupEventListeners(container) {
        const overlay = container.closest('.qr-popup-overlay');
        const closeIcon = container.querySelector('.close-icon');

        if (overlay && closeIcon) {
            closeIcon.addEventListener('click', () => {
                overlay.remove();
            });
        }

        // Event delegation cho action buttons
        const actionButtons = container.querySelector('.action-buttons');
        if (actionButtons) {
            actionButtons.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();

                const actionItem = e.target.closest('.action-item');
                if (!actionItem || actionItem.classList.contains('loading') || actionItem.classList.contains('disabled')) {
                    return;
                }

                const action = actionItem.dataset.action;

                // Disable tất cả buttons khi đang xử lý
                const allButtons = actionButtons.querySelectorAll('.action-item');
                allButtons.forEach((btn) => btn.classList.add('disabled'));

                try {
                    if (action === 'download') {
                        await downloadQrImage(actionItem);
                    } else if (action === 'share') {
                        await shareQrImage(actionItem);
                    }
                } finally {
                    // Re-enable buttons
                    setTimeout(() => {
                        allButtons.forEach((btn) => btn.classList.remove('disabled'));
                    }, 1000);
                }
            });
        }

        // Overlay click to close
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.remove();
                    console.log('QR display closed via overlay click.');
                }
            });
        }
    }

    // Initialize module
    async function initializeModule() {
        // Find or create target element
        let targetElement = document.getElementById(targetElementId);
        if (!targetElement) {
            console.warn(`Target element with ID "${targetElementId}" not found. Creating a div at the end of body.`);
            targetElement = document.createElement('div');
            targetElement.id = targetElementId;
            document.body.appendChild(targetElement);
        }

        // Inject HTML và CSS
        targetElement.innerHTML = htmlContent;
        injectCss(cssContent);

        // Setup event listeners
        const qrDisplayContainer = targetElement.querySelector('.containerQRByVu');
        if (qrDisplayContainer) {
            setupEventListeners(qrDisplayContainer);
        } else {
            console.error('QR display container not found after injection.');
            return;
        }

        // Preload QR image trong background
        try {
            await preloadQrImage(qrImageUrl);
        } catch (error) {
            console.warn('Preloading failed:', error);
        }
    }

    // Start initialization
    initializeModule();

    // Return API
    return {
        preloadResources: async () => {
            await preloadQrImage(qrImageUrl);
        },
    };
}
