/**
 * @name generate_css_safe_id
 * @abstract HTML is very permissive and lets you use IDs that don't actually
 * make any sense. CSS is not, and if you try to use a DOM selector which uses a
 * CSS selection mechanism, you'll need to adhere to CSS's id rules. I also want
 * to avoid ids which start with numbers or a dash being a problem, so I'm
 * prefixing the generated id with "id_"
 * 
 * @param string 
 * @returns string with format id_string
 */
export default function generate_css_safe_id(string: string) {
    return `id_${string.replace(/[^a-zA-Z\-_:\.0-9]/g, '')}`;
};