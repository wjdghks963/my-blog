"use client"
import {motion, useCycle, Variants} from "framer-motion";
import MenuToggle from '@components/Base/NavBar/Toggle'
import Navigation from '@components/Base/NavBar/Navigation'

// const sidebar:Variants = {
//     open: () => ({
//
//         transition: {
//             type: "spring",
//             stiffness: 20,
//             restDelta: 2,
//             duration: 0.8,
//         }
//     }),
//     closed: {
//         transition: {
//             type: "spring",
//             stiffness: 400,
//             damping: 40,
//             duration: 0.8,
//         },
//
//     }
// };
const sidebar:Variants = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px at 40px 40px)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};
export default function SlideHeaderNavBar(){
    const [isOpen, toggleOpen] = useCycle(false, true);

    return  <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebar}
        className={'fixed top-0 left-0 z-10 rounded-md'}
    >
        <motion.div className="absolute bg-white w-[200px] h-[100vh] " variants={sidebar} />

        <MenuToggle toggle={() => toggleOpen()} />
        <Navigation isOpen={isOpen} toggleOpen={toggleOpen}/>
    </motion.nav>
}


