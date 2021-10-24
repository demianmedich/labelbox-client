import React from 'react';
import styles from './App.module.css';
import LabelingView from '../labeling/labelingView';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App(): React.ReactElement {
  return (
    <div className={styles.app}>
      <LabelingView />
    </div>
  );
}

export default App;
