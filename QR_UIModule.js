// qrCodeDisplayModule.js (Optimized version)

async function loadHtml2Canvas() {
    if (window.html2canvas) return window.html2canvas;
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        script.onload = () => resolve(window.html2canvas);
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

async function elementToBase64(element, options = {}) {
    try {
        const html2canvas = await loadHtml2Canvas();
        if (!html2canvas) {
            console.error('html2canvas library could not be loaded');
            return null;
        }
        const canvas = await html2canvas(element, {
            backgroundColor: '#EAF6FF',
            scale: 1, // Giảm scale để tăng tốc độ
            useCORS: true,
            allowTaint: true,
            scrollX: 0,
            scrollY: 0,
            width: element.offsetWidth,
            height: element.offsetHeight,
            ...options,
        });
        return canvas.toDataURL('image/png');
    } catch (error) {
        console.error('Error converting element to base64:', error);
        return null;
    }
}

async function generateFullQrImage(fullContentElement) {
    if (!fullContentElement) {
        console.error('QR full content element not found');
        return null;
    }
    return await elementToBase64(fullContentElement);
}

async function shareQrImage(fullContentElement) {
    if (typeof apimobileAjax !== 'function') {
        console.log('Chia sẻ chỉ hỗ trợ trong ứng dụng di động!');
        return;
    }
    if (MainLoadPanel?.ShowLoadPanel) MainLoadPanel.ShowLoadPanel('Đang chia sẻ...');

    try {
        const fullQrImageBase64 = await generateFullQrImage(fullContentElement);
        if (!fullQrImageBase64) throw new Error('Không thể tạo hình ảnh QR');

        const filePath = fullQrImageBase64.replace(/^data:image\/png;base64,/, '');
        let filePathR = '';

        await apimobileAjaxAsync(
            {
                success: (data) => (filePathR = data),
            },
            {
                MethodName: 'MergeFileSplit',
                prs: [filePath, 0, 1, 'ScanQrDevice.jpg', 'ScanQrDevice.jpg', ''],
            }
        );

        const fileName = 'ScanQrDevice.jpg';
        await apimobileAjax(
            {
                success: (res) => {
                    console.log('✅ Chia sẻ thành công:', res);
                },
                error: (err) => {
                    console.error('❌ Chia sẻ thất bại:', err);
                },
            },
            { MethodName: 'MobileShareFileAsync', prs: [filePathR, fileName] }
        );
    } catch (error) {
        console.error('Lỗi khi chia sẻ QR:', error);
    } finally {
        if (MainLoadPanel?.HideLoadPanel) MainLoadPanel.HideLoadPanel();
    }
}

async function downloadQrImage(fullContentElement, button) {
    const originalText = button.querySelector('span').textContent;

    try {
        if (MainLoadPanel?.ShowLoadPanel) MainLoadPanel.ShowLoadPanel('Đang tải QR code...');
        button.classList.add('loading');
        button.querySelector('span').textContent = 'Đang tải...';

        const fullQrImageBase64 = await generateFullQrImage(fullContentElement);
        if (!fullQrImageBase64) throw new Error('Không thể tạo hình ảnh QR');

        const fileName = `QRCode_${userName}_${new Date().toISOString().split('T')[0]}.png`;
        const blob = await fetch(fullQrImageBase64).then((res) => res.blob());
        const url = window.URL.createObjectURL(blob);

        // Thử tải xuống trực tiếp qua Web API
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        button.querySelector('span').textContent = 'Thành công!';
        setTimeout(() => (button.querySelector('span').textContent = originalText), 2000);
    } catch (error) {
        console.error('❌ Download error:', error);
        button.querySelector('span').textContent = 'Lỗi tải xuống';
        setTimeout(() => (button.querySelector('span').textContent = originalText), 2000);

        // Fallback qua API nếu Web API thất bại
        if (typeof apimobileAjax === 'function') {
            await apimobileAjax(
                {
                    success: () => {
                        button.querySelector('span').textContent = 'Thành công!';
                        setTimeout(() => (button.querySelector('span').textContent = originalText), 2000);
                    },
                    error: () => {
                        button.querySelector('span').textContent = 'Lỗi tải xuống';
                        setTimeout(() => (button.querySelector('span').textContent = originalText), 2000);
                    },
                },
                { MethodName: 'AddMediaToPhotosLibrary', prs: [fullQrImageBase64, fileName] }
            );
        }
    } finally {
        button.classList.remove('loading');
        if (MainLoadPanel?.HideLoadPanel) MainLoadPanel.HideLoadPanel();
    }
}

export function createQrDisplayModule(userName, qrImageUrl, targetElementId = 'qr-display-container') {
    const htmlContent = `
        <div class="qr-popup-overlay">
            <div class="containerQRByVu">
                <div class="header"><div class="close-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#111" class="bi bi-x-lg" viewBox="0 0 16 16"><path stroke-width="3" d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/></svg></div></div>
                <div class="qr-full-content" id="qr-full-content">
                    <div class="qr-section">
                        <div class="qr-code-container"><img src="${qrImageUrl}" alt="QR Code" class="qr-image"></div>
                        <div class="user-info"><span class="user-name">${userName}</span></div>
                        <div class="qr-description">QR đồng bộ dữ liệu và kết nối nhân sự trên Vào Ca <br> Ứng dụng quản trị nhân sự toàn diện trên điện thoại.</div>
                    </div>
                    <div class="activation-section">
                        <div class="activation-header"><div class="activation-title">Kích hoạt hồ sơ nhân viên</div></div>
                        <div class="activation-details">Tải ứng dụng <span class="highlight">Vào Ca</span> về điện thoại, sau đó đăng nhập vào ứng dụng, mở chức năng quét QR và thực hiện đồng bộ nhân sự trên ứng dụng.</div>
                    </div>
                </div>
                <div class="action-buttons">
                    <div class="action-item"><svg style="margin-bottom: 4px;" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M2,13 C2,12.5 2.5,12 3,12 C3.5,12 4,12.5 4,13 C4,13.3333333 4,15 4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 C2,15 2,13.3333333 2,13 Z" fill="#004c39" fill-rule="nonzero"/><rect fill="#73C41D" transform="translate(12.000000, 8.000000) rotate(-180.000000) translate(-12.000000, -8.000000) " x="11" y="1" width="2" height="14" rx="1"/><path d="M7.70710678,15.7071068 C7.31658249,16.0976311 6.68341751,16.0976311 6.29289322,15.7071068 C5.90236893,15.3165825 5.90236893,14.6834175 6.29289322,14.2928932 L11.2928932,9.29289322 C11.6689749,8.91681153 12.2736364,8.90091039 12.6689647,9.25670585 L17.6689647,13.7567059 C18.0794748,14.1261649 18.1127532,14.7584547 17.7432941,15.1689647 C17.3738351,15.5794748 16.7415453,15.6127532 16.3310353,15.2432941 L12.0362375,11.3779761 L7.70710678,15.7071068 Z" fill="#73C41D" fill-rule="nonzero" transform="translate(12.000004, 12.499999) rotate(-180.000000) translate(-12.000004, -12.499999) "/></g></svg><span>Tải xuống</span></div>
                    <div class="action-item"><svg style="margin-bottom: 4px;" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M10.9,2 C11.4522847,2 11.9,2.44771525 11.9,3 C11.9,3.55228475 11.4522847,4 10.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,16 C20,15.4477153 20.4477153,15 21,15 C21.5522847,15 22,15.4477153 22,16 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L10.9,2 Z" fill="#004c39" fill-rule="nonzero"/><path d="M24.0690576,13.8973499 C24.0690576,13.1346331 24.2324969,10.1246259 21.8580869,7.73659596 C20.2600137,6.12944276 17.8683518,5.85068794 15.0081639,5.72356847 L15.0081639,1.83791555 C15.0081639,1.42370199 14.6723775,1.08791555 14.2581639,1.08791555 C14.0718537,1.08791555 13.892213,1.15726043 13.7542266,1.28244533 L7.24606818,7.18681951 C6.93929045,7.46513642 6.9162184,7.93944934 7.1945353,8.24622707 C7.20914339,8.26232899 7.22444472,8.27778811 7.24039592,8.29256062 L13.7485543,14.3198102 C14.0524605,14.6012598 14.5269852,14.5830551 14.8084348,14.2791489 C14.9368329,14.140506 15.0081639,13.9585047 15.0081639,13.7695393 L15.0081639,9.90761477 C16.8241562,9.95755456 18.1177196,10.0730665 19.2929978,10.4469645 C20.9778605,10.9829796 22.2816185,12.4994368 23.2042718,14.996336 L23.2043032,14.9963244 C23.313119,15.2908036 23.5938372,15.4863432 23.9077781,15.4863432 L24.0735976,15.4863432 C24.0735976,15.0278051 24.0690576,14.3014082 24.0690576,13.8973499 Z" fill="#73C41D" fill-rule="nonzero" transform="translate(15.536799, 8.287129) scale(-1, 1) translate(-15.536799, -8.287129) "/></g></svg><span>Chia sẻ</span></div>
                </div>
            </div>
        </div>
    `;

    const cssContent = `
        .qr-popup-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1999; }
        .containerQRByVu { width: calc(100% - 40px); margin: 30px 20px; background: linear-gradient(290deg,#EAF6FF 9.78%,#F3FFE9 109.56%); box-shadow: 0 20px 40px rgba(0,0,0,0.15); overflow: hidden; border-radius: 32px; z-index: 2000; }
        .containerQRByVu .header { display: flex; justify-content: flex-end; padding: 10px 15px; margin: 5px; font-size: 20px; color: #333; }
        .containerQRByVu .header .close-icon { background-color: #fff; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; border-radius: 50%; cursor: pointer; }
        .qr-full-content { width: 100%; background: linear-gradient(290deg,#EAF6FF 9.78%,#F3FFE9 109.56%); padding: 10px 20px; box-sizing: border-box; }
        .containerQRByVu .qr-section { display: flex; flex-direction: column; align-items: center; }
        .containerQRByVu .qr-code-container { width: 240px; height: 240px; border: 3px solid #004c39; background-color: #004c39; border-radius: 16px; margin-bottom: 20px; overflow: hidden; display: flex; justify-content: center; align-items: center; }
        .containerQRByVu .qr-image { width: 90%; height: 90%; object-fit: contain; }
        .containerQRByVu .user-info { font-size: 1.2rem; color: #004c39; font-weight: bold; margin-bottom: 5px; }
        .containerQRByVu .qr-description { font-size: 0.7rem; margin-top: 5px; color: #666; text-align: center; padding: 0 20px; }
        .containerQRByVu .activation-section { background-color: #f9f9f9; padding: 15px; margin: 10px 0; border-radius: 10px; border: 1px solid #fff; }
        .containerQRByVu .activation-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .containerQRByVu .activation-title { font-weight: bold; font-size: 0.8rem; color: #004c39; }
        .containerQRByVu .activation-details { font-size: 0.6rem; color: #555; line-height: 1.5; }
        .containerQRByVu .activation-details .highlight { color: #28a745; font-weight: bold; }
        .containerQRByVu .action-buttons { display: flex; justify-content: space-around; padding: 10px 0; border-top: 1px solid #eee; }
        .containerQRByVu .action-item { display: flex; flex-direction: column; align-items: center; font-size: 12px; color: #555; cursor: pointer; }
        .containerQRByVu .action-item.loading span { opacity: 0.6; pointer-events: none; }
        .containerQRByVu .action-item.loading span::before { content: ''; display: inline-block; width: 14px; height: 14px; margin-right: 6px; border: 2px solid #004c39; border-top: 2px solid transparent; border-radius: 50%; animation: spin 0.8s linear infinite; vertical-align: middle; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `;

    function injectCss(css) {
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    let targetElement = document.getElementById(targetElementId);
    if (!targetElement) {
        targetElement = document.createElement('div');
        targetElement.id = targetElementId;
        document.body.appendChild(targetElement);
    }

    targetElement.innerHTML = htmlContent;
    injectCss(cssContent);

    const qrDisplayContainer = targetElement.querySelector('.containerQRByVu');
    const fullContentElement = targetElement.querySelector('#qr-full-content');

    if (qrDisplayContainer) {
        qrDisplayContainer.querySelector('.close-icon').addEventListener('click', () => targetElement.remove());
        qrDisplayContainer.querySelector('.action-item:nth-child(1)').addEventListener('click', async (e) => {
            e.preventDefault();
            await downloadQrImage(fullContentElement, e.currentTarget);
        });
        qrDisplayContainer.querySelector('.action-item:nth-child(2)').addEventListener('click', async (e) => {
            e.preventDefault();
            await shareQrImage(fullContentElement);
        });
        targetElement.querySelector('.qr-popup-overlay').addEventListener('click', (e) => {
            if (e.target === targetElement.querySelector('.qr-popup-overlay')) targetElement.remove();
        });
    }

    return { generateFullQrImage: () => generateFullQrImage(fullContentElement) };
}
