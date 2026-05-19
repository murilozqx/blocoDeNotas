const STORAGE_KEY = 'blocoDeNotas.conteudo';
const STATUS_TIMEOUT = 1800;

const state = {
    textarea: null,
    clearButton: null,
    statusElement: null,
    statusTimeoutId: null,
};

const showStatus = (message) => {
    if (!state.statusElement) {
        return;
    }

    state.statusElement.textContent = message;
    clearTimeout(state.statusTimeoutId);
    state.statusTimeoutId = window.setTimeout(() => {
        state.statusElement.textContent = '';
    }, STATUS_TIMEOUT);
};

const loadNota = () => {
    if (!state.textarea) {
        return;
    }

    try {
        const notaSalva = localStorage.getItem(STORAGE_KEY);

        if (notaSalva !== null) {
            state.textarea.value = notaSalva;
            showStatus('Nota carregada.');
        }
    } catch (error) {
        console.warn('Não foi possível carregar a nota:', error);
        showStatus('Erro ao carregar a nota.');
    }
};

const saveNota = () => {
    if (!state.textarea) {
        return;
    }

    try {
        localStorage.setItem(STORAGE_KEY, state.textarea.value);
        showStatus('Salvo automaticamente.');
    } catch (error) {
        console.warn('Não foi possível salvar a nota:', error);
        showStatus('Erro ao salvar a nota.');
    }
};

const limparNota = () => {
    if (!state.textarea) {
        return;
    }

    state.textarea.value = '';

    try {
        localStorage.removeItem(STORAGE_KEY);
        showStatus('Nota apagada.');
    } catch (error) {
        console.warn('Não foi possível limpar a nota:', error);
        showStatus('Erro ao limpar a nota.');
    }
};

const init = () => {
    state.textarea = document.getElementById('blocoDeNotas');
    state.clearButton = document.getElementById('limparNota');
    state.statusElement = document.getElementById('statusMensagem');

    if (!state.textarea) {
        return;
    }

    loadNota();
    state.textarea.addEventListener('input', saveNota);

    if (state.clearButton) {
        state.clearButton.addEventListener('click', limparNota);
    }
};

document.addEventListener('DOMContentLoaded', init);
