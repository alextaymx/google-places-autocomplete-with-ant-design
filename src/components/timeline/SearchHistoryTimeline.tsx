import { Alert, Timeline, TimelineItemProps } from 'antd';
import React from 'react';

import styles from './SearchHistoryTimeline.module.css';

import { AutocompleteOption } from '@/hooks/useFetchSuggestions';
import { useSearchSlice } from '@/hooks/useSearchSlice';

type Props = {};

function SearchHistoryTimeline(props: Props) {
  const { searchHistory, setGeocodeByPlaceId, removeAllSearchHistory } =
    useSearchSlice();

  const handleClick = (history: AutocompleteOption) => {
    setGeocodeByPlaceId(history.value.place_id);
  };

  const items: TimelineItemProps[] = searchHistory.map((history) => {
    return {
      children: (
        <div
          onClick={() => handleClick(history)}
          className={styles['timeline-item']}
        >
          {history.label}
        </div>
      ),
    };
  });
  return (
    <div className={styles.container}>
      <Alert
        message={
          <div className={styles['search-history-label']}>
            <span>Past Search Histories</span>
            <span
              className={styles['clear-all-btn']}
              onClick={() => removeAllSearchHistory()}
            >
              Clear All
            </span>
          </div>
        }
        type='info'
      />

      <Timeline items={items} />
    </div>
  );
}

export default SearchHistoryTimeline;
