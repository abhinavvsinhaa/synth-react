export interface IPartsSplash {
    zoomLevel: number | undefined;
    baseTheme: string;
    colorInfo: {
        background: string;
        foreground: string | undefined;
        editorBackground: string | undefined;
        titleBarBackground: string | undefined;
        activityBarBackground: string | undefined;
        sideBarBackground: string | undefined;
        statusBarBackground: string | undefined;
        statusBarNoFolderBackground: string | undefined;
        windowBorder: string | undefined;
    };
    layoutInfo: {
        sideBarSide: string;
        editorPartMinWidth: number;
        titleBarHeight: number;
        activityBarWidth: number;
        sideBarWidth: number;
        statusBarHeight: number;
        windowBorder: boolean;
        windowBorderRadius: string | undefined;
    } | undefined;
}

export interface IColorScheme {
    readonly dark: boolean;
    readonly highContrast: boolean;
}

export type ThemeConfiguration = {
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundRepeat?: string;
    backgroundSize?: string;
    color?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    textAlign?: string;
    textDecoration?: string;
    margin?: string;
    padding?: string;
    width?: string;
    height?: string;
    display?: string;
    border?: string;
    borderBottom?:string;
    boxShadow?: string;
    transition?: string;
    animation?: string;
    cursor?: string;
    opacity?: string;
};

export type ThemeConfigurationKeys = keyof ThemeConfiguration;