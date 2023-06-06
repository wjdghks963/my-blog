import {useEffect, useState} from 'react'

export default function useVisibleScrollY():boolean {
    const [isVisible, setIsVisible] = useState(true);


    useEffect(()=>{
        let prevScrollPos = window.scrollY;
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            if (prevScrollPos > currentScrollPos) {
                setIsVisible(true); // 스크롤이 위로 올라갈 때 div를 보이도록 설정
            } else {
                setIsVisible(false); // 스크롤이 아래로 내려갈 때 div를 숨기도록 설정
            }

            prevScrollPos = currentScrollPos;
        };

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },[])

    return isVisible
}
