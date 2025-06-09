// Image Resizer
function initializeResizer() {
    const uploadArea = document.getElementById('resizerUpload');
    const fileInput = document.getElementById('resizerInput');
    const preview = document.getElementById('resizerPreview');
    const info = document.getElementById('resizerInfo');
    const downloadBtn = document.getElementById('downloadResized');
    const widthInput = document.getElementById('resizerWidth');
    const heightInput = document.getElementById('resizerHeight');
    const maintainRatio = document.getElementById('maintainAspectRatio');
    const qualityInput = document.getElementById('resizerQuality');
    const qualityValue = document.getElementById('qualityValue');

    let originalImage = null;
    let originalWidth = 0;
    let originalHeight = 0;

    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--bs-primary)';
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)';
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });

    function handleImageUpload(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            originalImage = new Image();
            originalImage.onload = () => {
                originalWidth = originalImage.width;
                originalHeight = originalImage.height;
                widthInput.value = originalWidth;
                heightInput.value = originalHeight;
                updatePreview();
                updateInfo();
            };
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function updatePreview() {
        if (!originalImage) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const width = parseInt(widthInput.value) || originalWidth;
        const height = parseInt(heightInput.value) || originalHeight;
        const quality = qualityInput.value / 100;

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(originalImage, 0, 0, width, height);

        preview.innerHTML = '';
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/jpeg', quality);
        preview.appendChild(img);

        downloadBtn.disabled = false;
    }

    function updateInfo() {
        if (!originalImage) return;

        const width = parseInt(widthInput.value) || originalWidth;
        const height = parseInt(heightInput.value) || originalHeight;
        const quality = qualityInput.value;

        info.innerHTML = `
            <p>Original: <span>${originalWidth} × ${originalHeight}px</span></p>
            <p>New Size: <span>${width} × ${height}px</span></p>
            <p>Quality: <span>${quality}%</span></p>
        `;
    }

    widthInput.addEventListener('input', () => {
        if (maintainRatio.checked) {
            const ratio = originalHeight / originalWidth;
            heightInput.value = Math.round(parseInt(widthInput.value) * ratio);
        }
        updatePreview();
        updateInfo();
    });

    heightInput.addEventListener('input', () => {
        if (maintainRatio.checked) {
            const ratio = originalWidth / originalHeight;
            widthInput.value = Math.round(parseInt(heightInput.value) * ratio);
        }
        updatePreview();
        updateInfo();
    });

    maintainRatio.addEventListener('change', () => {
        if (maintainRatio.checked) {
            const ratio = originalHeight / originalWidth;
            heightInput.value = Math.round(parseInt(widthInput.value) * ratio);
            updatePreview();
            updateInfo();
        }
    });

    qualityInput.addEventListener('input', () => {
        qualityValue.textContent = `${qualityInput.value}%`;
        updatePreview();
        updateInfo();
    });

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'resized-image.jpg';
        link.href = preview.querySelector('img').src;
        link.click();
    });
}

// Image Cropper
function initializeCropper() {
    const uploadArea = document.getElementById('cropperUpload');
    const fileInput = document.getElementById('cropperInput');
    const preview = document.getElementById('cropperPreview');
    const result = document.getElementById('cropperResult');
    const info = document.getElementById('cropperInfo');
    const downloadBtn = document.getElementById('downloadCropped');
    const aspectRatio = document.getElementById('cropperAspectRatio');
    const rotation = document.getElementById('cropperRotation');
    const rotationValue = document.getElementById('rotationValue');

    let cropper = null;

    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--bs-primary)';
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)';
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });

    function handleImageUpload(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.innerHTML = `<img src="${e.target.result}">`;
            if (cropper) {
                cropper.destroy();
            }
            cropper = new Cropper(preview.querySelector('img'), {
                aspectRatio: parseFloat(aspectRatio.value) || NaN,
                viewMode: 1,
                dragMode: 'move',
                autoCropArea: 1,
                restore: false,
                guides: true,
                center: true,
                highlight: false,
                cropBoxMovable: true,
                cropBoxResizable: true,
                toggleDragModeOnDblclick: false,
            });
            updatePreview();
        };
        reader.readAsDataURL(file);
    }

    function updatePreview() {
        if (!cropper) return;

        const canvas = cropper.getCroppedCanvas();
        result.innerHTML = '';
        const img = document.createElement('img');
        img.src = canvas.toDataURL();
        result.appendChild(img);

        const data = cropper.getData();
        info.innerHTML = `
            <p>Crop Size: <span>${Math.round(data.width)} × ${Math.round(data.height)}px</span></p>
            <p>Position: <span>X: ${Math.round(data.x)}, Y: ${Math.round(data.y)}</span></p>
        `;

        downloadBtn.disabled = false;
    }

    aspectRatio.addEventListener('change', () => {
        if (cropper) {
            cropper.setAspectRatio(parseFloat(aspectRatio.value) || NaN);
        }
    });

    rotation.addEventListener('input', () => {
        if (cropper) {
            cropper.rotateTo(parseInt(rotation.value));
            rotationValue.textContent = `${rotation.value}°`;
        }
    });

    cropper?.on('crop', updatePreview);

    downloadBtn.addEventListener('click', () => {
        if (!cropper) return;
        const link = document.createElement('a');
        link.download = 'cropped-image.jpg';
        link.href = result.querySelector('img').src;
        link.click();
    });
}

// Image Compressor
function initializeCompressor() {
    const uploadArea = document.getElementById('compressorUpload');
    const fileInput = document.getElementById('compressorInput');
    const preview = document.getElementById('compressorPreview');
    const info = document.getElementById('compressorInfo');
    const downloadBtn = document.getElementById('downloadCompressed');
    const qualityInput = document.getElementById('compressorQuality');
    const qualityValue = document.getElementById('compressorQualityValue');
    const resizeCheckbox = document.getElementById('compressorResize');
    const maxWidthInput = document.getElementById('compressorMaxWidth');

    let originalImage = null;
    let originalSize = 0;

    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--bs-primary)';
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)';
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });

    function handleImageUpload(file) {
        originalSize = file.size;
        const reader = new FileReader();
        reader.onload = (e) => {
            originalImage = new Image();
            originalImage.onload = () => {
                updatePreview();
                updateInfo();
            };
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function updatePreview() {
        if (!originalImage) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let width = originalImage.width;
        let height = originalImage.height;

        if (resizeCheckbox.checked) {
            const maxWidth = parseInt(maxWidthInput.value);
            if (width > maxWidth) {
                const ratio = maxWidth / width;
                width = maxWidth;
                height = Math.round(height * ratio);
            }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(originalImage, 0, 0, width, height);

        preview.innerHTML = '';
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/jpeg', qualityInput.value / 100);
        preview.appendChild(img);

        downloadBtn.disabled = false;
    }

    function updateInfo() {
        if (!originalImage) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let width = originalImage.width;
        let height = originalImage.height;

        if (resizeCheckbox.checked) {
            const maxWidth = parseInt(maxWidthInput.value);
            if (width > maxWidth) {
                const ratio = maxWidth / width;
                width = maxWidth;
                height = Math.round(height * ratio);
            }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(originalImage, 0, 0, width, height);

        const compressedSize = Math.round(canvas.toDataURL('image/jpeg', qualityInput.value / 100).length * 0.75);
        const compressionRatio = Math.round((1 - compressedSize / originalSize) * 100);

        info.innerHTML = `
            <p>Original Size: <span>${formatFileSize(originalSize)}</span></p>
            <p>Compressed Size: <span>${formatFileSize(compressedSize)}</span></p>
            <p>Compression Ratio: <span>${compressionRatio}%</span></p>
            <p>Dimensions: <span>${width} × ${height}px</span></p>
        `;
    }

    qualityInput.addEventListener('input', () => {
        qualityValue.textContent = `${qualityInput.value}%`;
        updatePreview();
        updateInfo();
    });

    resizeCheckbox.addEventListener('change', () => {
        maxWidthInput.disabled = !resizeCheckbox.checked;
        updatePreview();
        updateInfo();
    });

    maxWidthInput.addEventListener('input', () => {
        updatePreview();
        updateInfo();
    });

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'compressed-image.jpg';
        link.href = preview.querySelector('img').src;
        link.click();
    });
}

// Image Converter
function initializeConverter() {
    const uploadArea = document.getElementById('converterUpload');
    const fileInput = document.getElementById('converterInput');
    const preview = document.getElementById('converterPreview');
    const info = document.getElementById('converterInfo');
    const downloadBtn = document.getElementById('downloadConverted');
    const formatSelect = document.getElementById('converterFormat');
    const qualityInput = document.getElementById('converterQuality');
    const qualityValue = document.getElementById('converterQualityValue');

    let originalImage = null;
    let originalFormat = '';

    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--bs-primary)';
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)';
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });

    function handleImageUpload(file) {
        originalFormat = file.type.split('/')[1];
        const reader = new FileReader();
        reader.onload = (e) => {
            originalImage = new Image();
            originalImage.onload = () => {
                updatePreview();
                updateInfo();
            };
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function updatePreview() {
        if (!originalImage) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        ctx.drawImage(originalImage, 0, 0);

        preview.innerHTML = '';
        const img = document.createElement('img');
        img.src = canvas.toDataURL(`image/${formatSelect.value}`, qualityInput.value / 100);
        preview.appendChild(img);

        downloadBtn.disabled = false;
    }

    function updateInfo() {
        if (!originalImage) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        ctx.drawImage(originalImage, 0, 0);

        const convertedSize = Math.round(canvas.toDataURL(`image/${formatSelect.value}`, qualityInput.value / 100).length * 0.75);

        info.innerHTML = `
            <p>Original Format: <span>${originalFormat.toUpperCase()}</span></p>
            <p>New Format: <span>${formatSelect.value.toUpperCase()}</span></p>
            <p>File Size: <span>${formatFileSize(convertedSize)}</span></p>
            <p>Dimensions: <span>${originalImage.width} × ${originalImage.height}px</span></p>
        `;
    }

    formatSelect.addEventListener('change', () => {
        updatePreview();
        updateInfo();
    });

    qualityInput.addEventListener('input', () => {
        qualityValue.textContent = `${qualityInput.value}%`;
        updatePreview();
        updateInfo();
    });

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = `converted-image.${formatSelect.value}`;
        link.href = preview.querySelector('img').src;
        link.click();
    });
}

// GIF Maker
function initializeGifMaker() {
    const uploadArea = document.getElementById('gifMakerUpload');
    const fileInput = document.getElementById('gifMakerInput');
    const framesContainer = document.getElementById('gifFrames');
    const preview = document.getElementById('gifPreview');
    const info = document.getElementById('gifInfo');
    const downloadBtn = document.getElementById('downloadGif');
    const frameDuration = document.getElementById('gifFrameDuration');
    const qualityInput = document.getElementById('gifQuality');
    const qualityValue = document.getElementById('gifQualityValue');

    let frames = [];
    let gif = null;

    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--bs-primary)';
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)';
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';
        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
        if (files.length > 0) {
            handleImagesUpload(files);
        }
    });

    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
        if (files.length > 0) {
            handleImagesUpload(files);
        }
    });

    function handleImagesUpload(files) {
        frames = [];
        framesContainer.innerHTML = '';
        preview.innerHTML = '';
        info.innerHTML = '';
        downloadBtn.disabled = true;

        files.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'gif-frame';
                img.dataset.index = index;
                img.addEventListener('click', () => {
                    document.querySelectorAll('.gif-frame').forEach(frame => frame.classList.remove('selected'));
                    img.classList.add('selected');
                });
                framesContainer.appendChild(img);
                frames.push(img);

                if (frames.length === files.length) {
                    updatePreview();
                    updateInfo();
                }
            };
            reader.readAsDataURL(file);
        });
    }

    function updatePreview() {
        if (frames.length === 0) return;

        gif = new GIF({
            workers: 2,
            quality: qualityInput.value,
            width: frames[0].naturalWidth,
            height: frames[0].naturalHeight,
            workerScript: 'https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.worker.js'
        });

        frames.forEach(frame => {
            gif.addFrame(frame, { delay: parseInt(frameDuration.value) });
        });

        gif.on('finished', (blob) => {
            preview.innerHTML = '';
            const img = document.createElement('img');
            img.src = URL.createObjectURL(blob);
            img.className = 'gif-preview';
            preview.appendChild(img);
            downloadBtn.disabled = false;
        });

        gif.render();
    }

    function updateInfo() {
        if (frames.length === 0) return;

        info.innerHTML = `
            <p>Number of Frames: <span>${frames.length}</span></p>
            <p>Frame Duration: <span>${frameDuration.value}ms</span></p>
            <p>Dimensions: <span>${frames[0].naturalWidth} × ${frames[0].naturalHeight}px</span></p>
        `;
    }

    frameDuration.addEventListener('input', () => {
        updatePreview();
        updateInfo();
    });

    qualityInput.addEventListener('input', () => {
        qualityValue.textContent = `${qualityInput.value}%`;
        updatePreview();
        updateInfo();
    });

    downloadBtn.addEventListener('click', () => {
        if (!gif) return;
        const link = document.createElement('a');
        link.download = 'animation.gif';
        link.href = preview.querySelector('img').src;
        link.click();
    });
}

// Screenshot to PDF
function initializeScreenshot() {
    const uploadArea = document.getElementById('screenshotUpload');
    const fileInput = document.getElementById('screenshotInput');
    const preview = document.getElementById('screenshotPreview');
    const info = document.getElementById('screenshotInfo');
    const downloadBtn = document.getElementById('downloadPdf');
    const pageSize = document.getElementById('pdfPageSize');
    const orientation = document.getElementById('pdfOrientation');

    let screenshots = [];

    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--bs-primary)';
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)';
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';
        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
        if (files.length > 0) {
            handleScreenshotsUpload(files);
        }
    });

    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
        if (files.length > 0) {
            handleScreenshotsUpload(files);
        }
    });

    function handleScreenshotsUpload(files) {
        screenshots = [];
        preview.innerHTML = '';
        info.innerHTML = '';
        downloadBtn.disabled = true;

        files.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'screenshot-preview';
                screenshots.push(img);
                preview.appendChild(img);

                if (screenshots.length === files.length) {
                    updateInfo();
                    downloadBtn.disabled = false;
                }
            };
            reader.readAsDataURL(file);
        });
    }

    function updateInfo() {
        if (screenshots.length === 0) return;

        info.innerHTML = `
            <p>Number of Screenshots: <span>${screenshots.length}</span></p>
            <p>Page Size: <span>${pageSize.value.toUpperCase()}</span></p>
            <p>Orientation: <span>${orientation.value}</span></p>
        `;
    }

    pageSize.addEventListener('change', updateInfo);
    orientation.addEventListener('change', updateInfo);

    downloadBtn.addEventListener('click', () => {
        if (screenshots.length === 0) return;

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: orientation.value,
            unit: 'mm',
            format: pageSize.value
        });

        screenshots.forEach((img, index) => {
            if (index > 0) {
                pdf.addPage();
            }

            const imgProps = pdf.getImageProperties(img);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = imgProps.width;
            const imgHeight = imgProps.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = (pdfHeight - imgHeight * ratio) / 2;

            pdf.addImage(img, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        });

        pdf.save('screenshots.pdf');
    });
}

// Base64 Converter
function initializeBase64() {
    const uploadArea = document.getElementById('base64Upload');
    const fileInput = document.getElementById('base64Input');
    const preview = document.getElementById('base64Preview');
    const output = document.getElementById('base64Output');
    const copyBtn = document.getElementById('copyBase64');
    const formatSelect = document.getElementById('base64Format');
    const qualityInput = document.getElementById('base64Quality');
    const qualityValue = document.getElementById('base64QualityValue');

    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--bs-primary)';
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)';
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });

    function handleImageUpload(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                updatePreview(img);
                updateBase64(img);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function updatePreview(img) {
        preview.innerHTML = '';
        const previewImg = document.createElement('img');
        previewImg.src = img.src;
        preview.appendChild(previewImg);
    }

    function updateBase64(img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const base64 = canvas.toDataURL(`image/${formatSelect.value}`, qualityInput.value / 100);
        output.value = base64;
        copyBtn.disabled = false;
    }

    formatSelect.addEventListener('change', () => {
        if (preview.querySelector('img')) {
            updateBase64(preview.querySelector('img'));
        }
    });

    qualityInput.addEventListener('input', () => {
        qualityValue.textContent = `${qualityInput.value}%`;
        if (preview.querySelector('img')) {
            updateBase64(preview.querySelector('img'));
        }
    });

    copyBtn.addEventListener('click', () => {
        output.select();
        document.execCommand('copy');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Base64';
        }, 2000);
    });
}

// Helper Functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Initialize all tools when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeResizer();
    initializeCropper();
    initializeCompressor();
    initializeConverter();
    initializeGifMaker();
    initializeScreenshot();
    initializeBase64();
}); 