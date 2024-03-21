import Image from "next/image"
import "../styles/_HomeSection.scss"


export default function HomeSection(){
    return(
        <div className="HomeSection">
            <h2 className="my-heading-1">
                Josue Jeronimo
            </h2>
            <h3 className="my-heading-2">
                Developer and designer
            </h3>
            <p className="my-paragraph">
            I am Josue Sebastian Jeronimo, on the cusp of graduating with a Bachelor's degree in Computer Engineering from Florida International University, eagerly anticipating the transition of my  passion for technology and programming into a fulfilling career. My enthusiasm lies in exploring the full capabilites of backend and full-stack development, driven by a extensive interest that spans the entire spectrum of technological fields. The field's extensive body of knowledge, set apart by its depth and complexity, fascinates me, compelling me to delve into the principles of logic and mathe that form the foundation of prgramming. My previous projects that I have worked on, ranging from the development of a culinary website to the creation of a Spotify analysis tool, reflect my efforts to have myself understand the diverse array of technologies, programming languages, and development frameworks, which shows my dedication to adaptability and continuous learning.<br/><br/>Looking ahead, I envisage a future deeply rooted in this profession, aspiring to a position that not only poses challenges but is also greatly satisfying to me. My ambitions extend well into the future, with a doctoral degree in computer science in my sights, shows my love for the knowledge and my wanting to explore the nuances of computer science more profoundly. Aside from my focusing on my career, I am actively engaged in political activism, which emphasizes my commitment to effecting positive societal change. This combination of my technical abilities, an appetite for knowledge, and a commitment to societal welfare encapsulates my identity—not merely as an engineer but as a conscientious person puts me in a position to make a significant impact on both the world of tech and society at large.
            </p>
            <div className="my-social-icons"></div>
            <div className="my-image-wrapper">
                <div className="my-image-container">
                    {/* <Image src="" alt=""/> */}
                </div>
            </div>
        </div>
    )
}