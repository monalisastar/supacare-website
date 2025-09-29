declare module 'gray-matter' {
  interface GrayMatterFile<T = any> {
    content: string;
    data: T;
    excerpt?: string;
  }

  interface GrayMatterOptions {
    excerpt?: boolean | string | RegExp;
    [key: string]: any;
  }

  function matter<T = any>(input: string, options?: GrayMatterOptions): GrayMatterFile<T>;

  export default matter;
}
