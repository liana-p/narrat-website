/** @jsxImportSource theme-ui */
import * as React from "react";
import { Box, Grid, Heading, Link, Paragraph } from "theme-ui";
import { Modal } from "../modal";

export interface ImagesGridProps {
  images: string[];
}

export const ImagesGrid: React.FC<ImagesGridProps> = ({ images }) => {
  const [chosenPictureIndex, setChosenPictureIndex] = React.useState<
    number | null
  >(null);
  const [chosenPicture, setChosenPicture] = React.useState<string | null>(null);

  function updatePicture(index: number | null) {
    setChosenPictureIndex(index);
    if (index === null) {
      setChosenPicture(null);
    } else {
      setChosenPicture(images[index]);
    }
  }
  function onKeyPress(event: KeyboardEvent) {
    if (chosenPictureIndex === null) {
      return;
    }
    if (event.key === "Escape") {
      updatePicture(null);
    }
    if (event.key === "ArrowRight") {
      if (chosenPictureIndex < images.length - 1) {
        updatePicture(chosenPictureIndex + 1);
      } else {
        updatePicture(0);
      }
    }
    if (event.key === "ArrowLeft") {
      if (chosenPictureIndex > 0) {
        updatePicture(chosenPictureIndex - 1);
      } else {
        updatePicture(images.length - 1);
      }
    }
  }
  React.useEffect(() => {
    document.body.addEventListener("keydown", onKeyPress);
    return () => {
      document.body.removeEventListener("keydown", onKeyPress);
    };
  }, [chosenPicture, chosenPictureIndex]);
  return (
    <Box>
      {chosenPicture && (
        <Modal onClick={() => updatePicture(null)}>
          <Box
            sx={{
              padding: "m",
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <Box
              sx={{
                m: 0,
                p: 0,
                backgroundImage: `url(${chosenPicture})`,
                borderRadius: "30px",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        </Modal>
      )}
      <Grid columns={[1, 2, 3]} gap={20}>
        {images.map((image, index) => (
          <img
            src={image}
            sx={{
              cursor: "pointer",
              width: "100%",
              height: "auto",
            }}
            className="card-1"
            onClick={() => updatePicture(index)}
          />
        ))}
      </Grid>
    </Box>
  );
};
