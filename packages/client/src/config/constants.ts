const htmlElement = document.getElementsByTagName("html")[0]

export const APP_VERSION = htmlElement.getAttribute("version") || "Developer Version"
export const APP_BUILD_DATE = new Date(htmlElement.getAttribute("build-date") || Date.now())
