import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitTextJS from "../utils/SplitTextJS.js"
import image from "../images/neerajsir.png"


const LoaderScreen = ({setIsLoaded}) => {
    gsap.registerPlugin(useGSAP);



    useEffect(() => {
        let glaLoader = document.querySelector(".glaLoader");
        let olxLoader = document.querySelector(".olxLoader");
        let split = new SplitTextJS(glaLoader);
        let split2 = new SplitTextJS(olxLoader);

        const tl = gsap.timeline();
        tl.to({}, {}, 0.5);


        tl.from(split.chars, {
            opacity: 0,
            x: -50,
            stagger: 0.1,
            ease: "bounce.out",
        }, "<")
            .to(split.chars, {
                opacity: 1,
                stagger: 0.05,
            }, "<1")
        


        tl.from(split2.chars, {
            opacity: 0,
            y: -200,
            rotateX: 90,
            stagger: 0.1,
            ease: "back.out",
            duration: 1,
        }, "<").to(split2.chars, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
        })

        tl.from(".dash", {
            width: 0,
            opacity: 0,
            ease: "back.out",
        }, "<")
            .to(".dash", {
                width: 54,
                opacity: 1,
                ease: "back.out",
            }, "<")

        tl.to(split2.chars[0], {
            rotateY: 180,
            duration: 1,
            onUpdate: () => {
                setTimeout(() => {
                    split2.chars[0].innerHTML = `<img className="oPic" src=${image} alt="" /> `
                }, 200);
            },
            onComplete: ()=>{
                setIsLoaded(true);
            }
        })

    }, []);







    return (
        <>
            <div className="loaderBox">
                <h1 className="glaLoader">
                    GLA
                </h1>
                <span className="dash"></span>
                <h1 className="olxLoader">
                    <img src="images/neerajsir.png" alt="" />
                    OLX
                </h1>
            </div>
        </>
    )
}

export default LoaderScreen