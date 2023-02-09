import { useContext } from "react";

import DynamicHelmet from "../../helmets/DynamicHelmet";
import PaginatedItems from "../../components/pagination/PaginatedItems";
import ProjectCard from "../../components/general/ProjectCard";
import PathNav from "../../components/general/PathNav";

import styles from "./ProjectCategory.module.css";

import LangContext from "../../contexts/lang-context";
import ContentContext from "../../contexts/content-context";
import images from "../../contents/images";

import useWindowDimensions from "../../hooks/useWindowDimensions";

function ProjectCategory(props) {
  const langContext = useContext(LangContext);
  const contentContext = useContext(ContentContext);
  const categoryContext =
    contentContext[langContext.lang].projects.categoryPages[props.category];
  const imagesContext = images.projectImages[props.category];
  const pathNavContext =
    contentContext[langContext.lang].components.PathNav.projects.projectPage[
      props.category
    ];

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

export default ProjectCategory;
