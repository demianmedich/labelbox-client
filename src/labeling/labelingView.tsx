import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import PanToolRoundedIcon from '@mui/icons-material/PanToolRounded';
import React from 'react';
import styles from './labelingView.module.css';
import { fabric } from 'fabric';
import karina from '../karina.jpg';
import winter from '../winter.jpg';
import ningning from '../ningning.jpg';
import giselle from '../giselle.jpg';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { EditMode } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  editModeSelector,
  setCurrentImgSrc,
  setEditMode,
} from './labelingSlice';

export default function LabelingView(): React.ReactElement {
  return (
    <div className={styles.labelingView}>
      <ImageList />
      <Workbench currentImgSrc={karina} />
    </div>
  );
}

function ImageList(): React.ReactElement {
  return <div className={styles.imageList}></div>;
}

function Workbench(props: { currentImgSrc: string }): React.ReactElement {
  return (
    <div className={styles.workbench}>
      <Toolbox />
      <Canvas currentImgSrc={props.currentImgSrc} />
    </div>
  );
}

interface Point {
  x: number;
  y: number;
}

function Toolbox(): React.ReactElement {
  const dispatch = useDispatch();

  const mode = useSelector(editModeSelector);

  const handleChange = (ev: any, mode: EditMode) => {
    console.log(`handleChange mode: ${mode}`);
    if (mode !== null) {
      dispatch(setEditMode(mode));
    }
  };

  return (
    <div className={styles.toolbox}>
      <ToggleButtonGroup
        orientation="vertical"
        value={mode}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value={EditMode.SELECTION}>
          <PanToolRoundedIcon />
        </ToggleButton>
        <ToggleButton value={EditMode.LABELING}>
          <CheckBoxOutlineBlankRoundedIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

function Canvas(props: { currentImgSrc: string }): React.ReactElement {
  const mode = useSelector(editModeSelector);

  const [canvas, setCanvas] = React.useState<fabric.Canvas | null>(null);

  let startPoint: Point | null = null;

  const registerMouseCallbacks = (
    canvas: fabric.Canvas | null,
    mode: EditMode
  ) => {
    console.log(`[Canvas] registerMouseCallbacks canvas: ${canvas}`);

    const handleMouseDown = (options: fabric.IEvent<MouseEvent>) => {
      if (mode === EditMode.LABELING) {
        startPoint = { x: options.e.offsetX, y: options.e.offsetY };
        console.log(`[Canvas] handleMouseDown startPoint: ${startPoint}`);
      }
    };

    const handleMouseUp = (options: fabric.IEvent<MouseEvent>) => {
      if (mode === EditMode.LABELING && startPoint) {
        const rect = new fabric.Rect({
          left: startPoint.x,
          top: startPoint.y,
          width: options.e.offsetX - startPoint.x,
          height: options.e.offsetY - startPoint.y,
          strokeWidth: 1,
          stroke: 'red',
          opacity: 0.5,
        });
        console.log(`[Canvas] handleMouseUp rect: ${rect}`);
        canvas?.add(rect);
        startPoint = null;
      }
    };

    const handleMouseMove = (options: fabric.IEvent<MouseEvent>) => {
      if (mode === EditMode.LABELING && startPoint) {
        console.log('mouse move');
      }
    };
    canvas?.off();

    canvas?.on('mouse:down', handleMouseDown);
    canvas?.on('mouse:up', handleMouseUp);
    canvas?.on('mouse:move', handleMouseMove);
  };

  React.useEffect(() => {
    console.log(`[Canvas] useEffect() currentImgSrc: ${props.currentImgSrc}`);
    const canv = new fabric.Canvas('canvas');
    fabric.Image.fromURL(props.currentImgSrc, (image: fabric.Image) => {
      const width: number = image.width ? image.width : 300;
      const height: number = image.height ? image.height : 150;

      canv.setWidth(width);
      canv.setHeight(height);
      canv.setBackgroundImage(image, () => {
        console.log('image loaded');
      });
      setCanvas(canv);
      registerMouseCallbacks(canv, mode);
    });
  }, [props.currentImgSrc]);

  React.useEffect(() => {
    console.log(
      `[Canvas] useEffect() mode changed to ${mode}, canv: ${canvas}`
    );
    registerMouseCallbacks(canvas, mode);
  }, [mode]);

  return (
    <div className={styles.canvasContainer}>
      <canvas id="canvas" />
    </div>
  );
}
