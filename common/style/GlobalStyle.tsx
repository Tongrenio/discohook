import { fontFace, size } from "polished"
import { createGlobalStyle, css } from "styled-components"

export const GlobalStyle = createGlobalStyle`${css`
  ${[300, 400, 500, 600, 700].map(weight =>
    fontFace({
      fontFamily: "Whitney",
      fontStyle: "normal",
      fontWeight: String(weight),
      fontFilePath: `/static/whitney-${weight}`,
      fileFormats: ["woff2", "woff"],
      fontDisplay: "swap",
    }),
  )};

  html,
  body {
    padding: 0;
    margin: 0;
    background: ${({ theme }) => theme.background.primary};

    line-height: 1;
    color: ${({ theme }) => theme.text.normal};
    font-family: ${({ theme }) => theme.font.sans};
    font-size: ${({ theme }) => theme.appearance.fontSize}px;

    text-rendering: optimizeLegibility;
    text-size-adjust: 100%;

    height: 100%;
    overflow: hidden;
  }

  button,
  input,
  textarea {
    font-family: inherit;
  }

  #app,
  #__next {
    height: 100%;
  }

  pre,
  code {
    font-family: ${({ theme }) => theme.font.mono};
  }

  a {
    color: ${({ theme }) => theme.text.link};

    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
  }

  * {
    box-sizing: border-box;

    scrollbar-color: ${({ theme }) =>
      [theme.background.tertiary, theme.background.secondary].join(" ")};
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      ${size(14)};

      background-color: ${({ theme }) => theme.background.primary};
    }

    &::-webkit-scroll-corner {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.background.tertiary};
      border: 3px solid ${({ theme }) => theme.background.primary};
      border-radius: 7px;
      background-clip: padding-box;
    }

    &::-webkit-scrollbar-track-piece {
      background-color: ${({ theme }) => theme.background.secondary};
      border: 3px solid ${({ theme }) => theme.background.primary};
      border-radius: 7px;
    }

    &::-webkit-resizer {
      background-color: ${({ theme }) => theme.background.primary};
      background-image: url("/static/resizer-${({ theme }) =>
        theme.appearance.color}.svg");
      background-repeat: no-repeat;
      background-position: bottom right;
    }
  }
`}`
