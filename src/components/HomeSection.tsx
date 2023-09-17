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
                Freelancer providing services for programming and design content needs. Join me below and let&rsquo;s get started!
            </p>
            <div className="my-social-icons"></div>
            <div className="my-image-wrapper">
                <div className="my-image-container">
                    <Image src="" layout="fill" objectFit="cover" alt=""/>
                </div>
            </div>
        </div>
    )
}