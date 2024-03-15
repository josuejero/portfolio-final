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
            I'm Josue Sebastian Jeronimo, a soon-to-be graduate with a Bachelor of Science in Computer Engineering from Florida International University, and I'm on the brink of transforming my deep-seated passion for technology into a vibrant career. My immediate goal is to secure a remote position at one of the leading tech companies, drawn to their wealth of experience in nurturing beginner software engineers like myself. I'm particularly excited about diving deeper into backend development, although the breadth of my interests has me setting my sights on becoming a full-stack developer.<br/><br/>What drives my interest in technology and software engineering is the vast expanse of knowledge the field encompasses. The depth and detail fascinate me, fueled by my love for the logic and mathematics that underpin everything in this domain. It's the interconnectedness of it all that compels me to learn as much as I can, to understand how each piece fits into the larger puzzle.<br/><br/>I've challenged myself with a variety of projects, from creating a recipe website for Peruvian dishes to developing a Spotify profile analyzer. These endeavors were not just exercises in coding but ambitious attempts to familiarize myself with as many popular tech stacks, databases, and programming languages as possible. My aim was to make my projects as diverse as the field itself, reflecting my commitment to versatility and continuous learning.<br/><br/>Looking forward, I see myself in five years still deeply entrenched in the field I love, hopefully settled into a job that not only challenges me but also brings me immense satisfaction. However, my ambitions stretch further into the future, with plans to pursue a doctorate in computer science within the next decade. This goal underscores my unending thirst for knowledge and my desire to explore the intricacies of computer science at an even deeper level.<br/><br/>Outside of my professional interests, I am passionately engaged in political activism. This engagement speaks to my belief in the importance of civic responsibility and the impact we can have on society. It's this blend of technical skill, insatiable curiosity, and social consciousness that defines me, not just as an engineer, but as a person eager to contribute meaningfully to the world around me.<br/><br/>As I stand on the precipice of my career, my portfolio is more than just a collection of projects; it's a testament to my journey as a dedicated, ambitious, and socially aware individual poised to leave a mark in the technology landscape.
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