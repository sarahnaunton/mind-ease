import "./BurnOutResource.scss";

export default function BurnOutResource ({children, image, darkTheme}){
    return (
        <article className="resource">
            <img
              src={image}
              alt="Mental  Health Resource Logo"
              className={`resource__image ${
                darkTheme ? "resource__image--dark" : ""
              }`}
            />
            <p
              className={`resource__text ${
                darkTheme ? "resource__text--dark" : ""
              }`}
            >
             {children}
            </p>
        </article>
    )
}