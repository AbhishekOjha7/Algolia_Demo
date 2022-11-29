import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, StatusBar, Button} from 'react-native';
import algoliasearch from 'algoliasearch';
import {InstantSearch, connectRefinementList} from 'react-instantsearch-native';
import SearchBox from './src/SearchBox';
import InfiniteHits from './src/InfiniteHits';
import Filters from './src/Filter';

const searchClient = algoliasearch(
  'UOXUDWRQ7Y',
  '3043becbde13761e8374a53755142412',
);

const VirtualRefinementList = connectRefinementList(() => null);
const App = () => {
  const root = {
    Root: View,
    props: {
      style: {
        flex: 1,
      },
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchState, setSearchState] = useState({});

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onSearchStateChange = (searchState: any) => {
    setSearchState(searchState);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <InstantSearch
          searchClient={searchClient}
          indexName="test_algolia"
          //@ts-ignore
          root={root}
          searchState={searchState}
          onSearchStateChange={onSearchStateChange}>
          <VirtualRefinementList attribute="batsman" />

          <Filters
            isModalOpen={isModalOpen}
            searchClient={searchClient}
            searchState={searchState}
            toggleModal={toggleModal}
            onSearchStateChange={onSearchStateChange}
          />

          <SearchBox />
          {/* <Button title="Filters" color="#252b33" onPress={toggleModal} /> */}
          <InfiniteHits />
        </InstantSearch>
      </View>
    </SafeAreaView>
  );
};
export default App;
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#252b33',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
