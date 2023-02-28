
/**
 * 模块联邦输出多语言加载方法，使用import动态加载方式实现按需加载
 * @param lang 
 * @returns 
 */
export default async function (lang: string) {
  return await import(`../lang/${lang}.ts`);
}
