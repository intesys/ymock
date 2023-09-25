import "react";

// Workaround for:
// Property 'jsx' does not exist on type
// 'DetailedHTMLProps<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>'.
// https://stackoverflow.com/questions/66011598/styled-jsx-typescript-error-after-migrating-to-monorepo-structure-property-jsx
declare module "react" {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}
