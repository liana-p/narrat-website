const theme = {
  colors: {
    text: "#fff",
    background: "#060606",
    primary: "#3cf",
    secondary: "#e0f",
    muted: "#191919",
    highlight: "#29112c",
    gray: "#999",
    purple: "#c0f",
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  space: {
    xs: 4,
    s: 8,
    m: 16,
    l: 32,
    xl: 64,
    xxl: 128,
  },
  fontSizes: {
    xs: "1.2rem",
    s: "1.4rem",
    m: "1.6rem",
    l: "1.8rem",
    xl: "2.0rem",
    xxl: "2.4rem",
    xxxl: "3.0rem",
  },
  fontWeights: {
    body: 400,
    heading: 700,
    display: 900,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  textStyles: {
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
    },
    display: {
      variant: "textStyles.heading",
      fontSize: ["xxl", "xxxl"],
      fontWeight: "display",
      mt: "xs",
    },
    subtitle: {
      fontSize: ["xl", "xl"],
      fontWeight: "bold",
      mt: "xs",
    },
  },
  styles: {
    Container: {
      p: "xs",
      maxWidth: 1024,
    },
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      variant: "textStyles.display",
      fontSize: "xxxl",
    },
    h2: {
      variant: "textStyles.heading",
      fontSize: "xxl",
    },
    h3: {
      variant: "textStyles.heading",
      fontSize: "xl",
    },
    h4: {
      variant: "textStyles.heading",
      fontSize: "l",
    },
    h5: {
      variant: "textStyles.heading",
      fontSize: "m",
    },
    h6: {
      variant: "textStyles.heading",
      fontSize: "s",
    },
    a: {
      color: "primary",
      "&:hover": {
        color: "secondary",
      },
    },
    pre: {
      variant: "prism",
      fontFamily: "monospace",
      fontSize: "m",
      p: "xs",
      color: "text",
      bg: "muted",
      overflow: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      color: "secondary",
      fontSize: "m",
    },
    inlineCode: {
      fontFamily: "monospace",
      color: "secondary",
      bg: "muted",
    },
    table: {
      width: "100%",
      my: "xs",
      borderCollapse: "separate",
      borderSpacing: 0,
      "th,td": {
        textAlign: "left",
        py: "4px",
        pr: "4px",
        pl: 0,
        borderColor: "muted",
        borderBottomStyle: "solid",
      },
    },
    th: {
      verticalAlign: "bottom",
      borderBottomWidth: "2px",
    },
    td: {
      verticalAlign: "top",
      borderBottomWidth: "1px",
    },
    hr: {
      border: 0,
      borderBottom: "1px solid",
      borderColor: "muted",
    },
    img: {
      maxWidth: "100%",
    },
  },
  prism: {
    ".comment,.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url": {
      color: "gray",
    },
    ".comment": {
      fontStyle: "italic",
    },
    ".property,.tag,.boolean,.number,.constant,.symbol,.deleted,.function,.class-name,.regex,.important,.variable":
      {
        color: "purple",
      },
    ".atrule,.attr-value,.keyword": {
      color: "primary",
    },
    ".selector,.attr-name,.string,.char,.builtin,.inserted": {
      color: "secondary",
    },
  },
  buttons: {
    link: {
      p: "m",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "l",
    },
  },
  links: {
    siteName: {
      color: "text",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "xxxl",
    },
    title: {
      color: "link",
      textDecoration: "none",
      fontWeight: "bold",
    },
    nav: {
      fontWeight: "bold",
      px: "m",
      py: 2,
      textDecoration: "none",
      fontSize: "l",
    },
    unstyled: {
      textDecoration: "none",
      fontWeight: "unset",
      color: "unset",
    },
  },
  headings: {
    articleHeading: {
      color: "link",
      fontSize: 26,
    },
  },
  grids: {
    articleGrid: {
      gridColumns: [1, 1, 2],
      gap: 64,
    },
  },
  cards: {
    articleCard: {
      // bg: "highlight",
      py: "m",
      px: "s",
    },
  },
  images: {
    rounded: {
      borderRadius: "10px",
    },
    avatar: {
      borderRadius: 99999,
    },
    hero: {
      width: "100%",
    },
    logo: {
      width: "40px",
    },
  },
  boxes: {
    verticalSeparated: {
      py: "m",
      borderColor: "gray",
      borderTopStyle: "solid",
      borderBottomStyle: "solid",
      borderTopWidth: "2px",
      borderBottomWidth: "2px",
    },
  },
};

export default theme;
