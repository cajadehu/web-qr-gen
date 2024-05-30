//version 1001
//May-24-2024
//Developed by Richard Tress

function processInfoAttribute(info) {
    return info.replace(/\\n/g, '<br>');
}

document.addEventListener("DOMContentLoaded", function() {
    const commonSize = 300;
    const commonPadding = '16px';
    const commonCaptionSize = '14px';
    const commonCaptionFontFamily = 'Mulish, Outfit, Arial, sans-serif';

    document.querySelectorAll('div[type="qrcode"], span[type="qrcode"]').forEach(qrElement => {
        const url = qrElement.getAttribute('url');
        const info = qrElement.getAttribute('info') || '';
        let textContent = qrElement.getAttribute('text') || '';
        const colors = qrElement.getAttribute('colors');

        const content = info || url;
        textContent = (textContent === 'copy' && info) ? processInfoAttribute(info) : textContent;
        textContent = processInfoAttribute(textContent);

        let colorLight = '#FFFFFF';
        let colorDark = '#000000';
        if (colors === 'wcw') {
            colorLight = '#FFEE66';
            colorDark = '#224499';
        } else if (colors === 'vhs') {
            colorLight = '#D6682F';
            colorDark = '#000000';
        } else if (colors === 'kimmie') {
            colorLight = '#EEBE2D';
            colorDark = '#830000';
        } else if (colors === 'buck') {
            colorLight = '#FFFFFF';
            colorDark = '#500D1D';
        }

        const options = {
            text: content,
            size: commonSize,
            padding: commonPadding,
            colorLight: colorLight,
            colorDark: colorDark,
            captionContent: textContent,
            captionSize: commonCaptionSize,
            captionFontFamily: commonCaptionFontFamily,
        };

        qrElement.innerHTML = '';

        const container = document.createElement('div');
        container.style.cssText = 'display: flex; flex-direction: column; align-items: center;';

        const qrCodeContainer = document.createElement('div');
        qrCodeContainer.style.cssText = `width: ${options.size}px; height: ${options.size}px; padding: ${options.padding}; background-color: ${options.colorLight}; display: flex; justify-content: center; align-items: center;`;

        const captionContainer = document.createElement('div');
        captionContainer.style.cssText = `width: ${options.size}px; background-color: ${options.colorLight}; padding: 0px ${options.padding} ${options.padding} ${options.padding}; text-align: center;`;

        const qrCode = new QRCode(qrCodeContainer, {
            text: options.text,
            width: options.size - parseInt(options.padding) * 0,
            height: options.size - parseInt(options.padding) * 0,
            colorDark: options.colorDark,
            colorLight: options.colorLight
        });

        const caption = document.createElement('div');
        caption.innerHTML = options.captionContent;
        caption.style.cssText = `font-size: ${options.captionSize}; color: ${options.colorDark}; font-family: ${options.captionFontFamily}; font-weight: bold; word-wrap: break-word; white-space: pre-wrap;`;

        if (url) {
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.appendChild(qrCodeContainer);
            link.appendChild(captionContainer);
            captionContainer.appendChild(caption);
            container.appendChild(link);
        } else {
            container.appendChild(qrCodeContainer);
            captionContainer.appendChild(caption);
            container.appendChild(captionContainer);
        }

        qrElement.appendChild(container);
    });
});
