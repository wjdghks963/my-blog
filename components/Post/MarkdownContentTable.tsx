"use client"
import { motion } from "framer-motion";

const createTableOfContents = (markdown:string) => {
    const regex = /\n(#+)\s+(.*)/g;
    let match;
    const tableOfContents = [];
    while ((match = regex.exec(markdown)) !== null) {
        const level = match[1].length;
        const title = match[2];
        const anchor = title
            .replace(/\.\s+/g, '-')
            .replace(/[^a-zA-Z0-9가-힣\s-]/g, "")
            .replace(/ /g, "-")
            .toLowerCase();
        tableOfContents.push({ level, anchor, title });
    }
    return tableOfContents;
};


export default function TableOfContents({markdown}: { markdown: string }) {

    const toc = createTableOfContents(markdown);

    const scrollTo = (headerId:string) =>{
        const header = document.getElementById(headerId);
        return header?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return (
        <div className="fixed right-0 top-0 min-w-md bg-white p-4 space-y-4 rounded-sm border-2 border-gray-200 shadow-sm shadow-slate-300">
            <h2 className="text-xl">Table of Contents</h2>
            <ul>
                {toc.map((item, index) => (
                    <motion.li whileHover={{scale: 1.1}}
                               transition={{duration: 0.2}} key={index} className={'cursor-pointer'}>
                        <a className={'underline underline-offset-2'} onClick={(e) => {
                            scrollTo(item.anchor)
                        }}>{item.title}</a>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};
