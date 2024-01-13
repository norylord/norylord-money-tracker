const darkMode = ref(true)

export const useTheme = () => {

    const lightThemeColors = {
        'background': '#fff',
        'background-light': '#fff',
        'text-color': '#7690da',
        'primary': '#7690da',
        'primary-light': '#849de7',
        'primary-dark': '#566daf',
        'ui-color': '#7690da',
        'input-bg': '#fff',
        '--ui-labels': '#212121',
    }
    const darkThemeColors = {
        'background': '#121212',
        'background-light': '#323232',
        'text-color': '#ffffff',
        'primary': '#424242',
        'primary-light': '#484848',
        'primary-dark': '#363636',
        'ui-color': '#5051f9',
        'input-bg': '#424242',
        'ui-labels': '#fff',
    }

    const toggleTheme = () => {
        darkMode.value = !darkMode.value
        if (process.client)
            localStorage.setItem('darkMode', JSON.stringify(darkMode.value))
        const currentScheme = darkMode.value ? darkThemeColors : lightThemeColors
        Object.keys(currentScheme).forEach(variable => {
            document.documentElement.style.setProperty('--' + variable, currentScheme[variable]);
        })
    }

    return {
        toggleTheme,
        darkMode
    }
}