import DynamicHelmet from "../../helmets/DynamicHelmet";
import PaginatedItems from "../../components/pagination/PaginatedItems";
import ProjectCard from "../../components/general/ProjectCard";
import PathNav from "../../components/general/PathNav";

import styles from "./projects.module.css";

import useWindowDimensions from "../../hooks/use-window-dimensions";
import useContent from "../../hooks/use-content/use-content";

export default function Projects(props) {
  const [content, images, pathNav] = useContent();

  const categoryContext = content.projects.categoryPages[props.category];
  const imagesContext = images.projectImages[props.category];
  const pathNavContext = pathNav.projects.projectPage[props.category];

  // Seperating one big project card array to several small arrays to render them next to each other in desktop size
  const [width] = useWindowDimensions();

  const projectCardContextSize = width >= 1200 ? 2 : 1;

  const projectCardsContext = categoryContext.projectCards
    .map((cur, i) => {
      if (i % projectCardContextSize) return;
      return categoryContext.projectCards.slice(i, i + projectCardContextSize);
    })
    .filter((cur) => cur !== undefined);

  const newImageContext = categoryContext.projectCards
    .map((cur, i) => {
      if (i % projectCardContextSize) return;
      return imagesContext.slice(i, i + projectCardContextSize);
    })
    .filter((cur) => cur !== undefined);

  return (
    <>
      <DynamicHelmet page={props.category} />
      <div className={styles.center}>
        <PathNav
          items={pathNavContext}
          styles={styles.path}
        />
        <h1 className="h2">{categoryContext.title}</h1>
        <PaginatedItems
          itemsPerPage={5}
          controlsClassName={styles.controls}
          itemClassName={styles.item}>
          {projectCardsContext.map((cur, i) => (
            <>
              {cur.map((curProject, projectIndex) => (
                <ProjectCard
                  key={`${i}${projectIndex}`}
                  title={curProject.title}
                  description={curProject.description}
                  src={newImageContext[i][projectIndex][0]}
                  images={newImageContext[i][projectIndex]}
                />
              ))}
            </>
          ))}
        </PaginatedItems>
      </div>
    </>
  );
}
