export default defineNuxtConfig({
    app: {
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
        },
        pageTransition: {
            name: "fade",
            mode: "out-in", // default
        },
        layoutTransition: {
            name: "slide",
            mode: "out-in", // default
        },
        meta: {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        }
    },
    modules: ['@pinia/nuxt'],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "core/assets/variables/colors.scss" as *;'
                },
            },
        },
    },
    alias: {
        '@core': '~/core'
    },
    device: {
        refreshOnResize: true,
    },
})