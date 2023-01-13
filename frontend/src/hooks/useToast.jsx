
import { toast } from 'react-toastify';

/**
 * Toast гаргах
 * @param {string}          text            TOAST дээр харагдах msg
 * @param {Function}        onClose         TOAST хаагдах үед хийгдэх функц
 * @param {number}          time            TOAST харагдах хугацаа (ms)
 * @param {string}          type            TOAST ийн төрөл
 * @param {string}          theme           TOAST дэвсгэр өнгөний төрөл
 * @returns Toast
 */
function addToast({ text, onClose, time, type='success', theme='dark' })
{
    toast(
        text,
        {
            position: toast.POSITION.TOP_LEFT,
            onClose: () => { if (onClose) onClose() },
            type: type,
            autoClose: time,
            theme,
        }
    )
}

/**
 * Бүх toast хаах
 */
function clearAllToast()
{
    toast.dismiss()
}

export {
    addToast,
    clearAllToast
};
