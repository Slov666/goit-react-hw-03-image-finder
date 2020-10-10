import React, { Component } from 'react';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';

import articleAPI from '../../services/articleApi';

export default class App extends Component {
  state = {
    searchQuery: '',
    dataImages: [],
    page: 1,
    error: null,
    loading: false,
    largeImageUrl: null,
    showModal: true,
  };
  setLargeImageUrl = url => {
    this.setState({ largeImageUrl: url.large });
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };
  componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const curentpage = this.state.page;
    if (prevPage !== curentpage) {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.handlerFetch();
    }
  }

  handlerFetch = async () => {
    const { searchQuery, page } = this.state;
    try {
      this.setState({ loading: true });
      await articleAPI
        .fetchArticlesWithQuery(searchQuery, page)
        .then(dataImages => {
          this.setState(prevState => ({
            dataImages: [...prevState.dataImages, ...dataImages],
            page: prevState.page + 1,
          }));
        });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  // handlerFetch = () => {
  //   const { searchQuery, page } = this.state;
  //   this.setState({ loading: true });
  //   articleAPI
  //     .fetchArticlesWithQuery(searchQuery, page)
  //     .then(dataImages => {
  //       this.setState(prevState => ({
  //         dataImages: [...prevState.dataImages, ...dataImages],
  //         page: prevState.page + 1,
  //       }));
  //       window.scrollTo({
  //         top: document.documentElement.scrollHeight,
  //         behavior: 'smooth',
  //       });
  //     })
  //     .catch(error => this.setState({ error }))
  //     .finally(() => this.setState({ loading: false }));
  // };
  handlerSearchbar = inputValue => {
    this.setState({ searchQuery: inputValue });
    this.setState({ dataImages: [] });
    this.setState({ page: 1 });
  };
  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { dataImages, loading, largeImageUrl, showModal, error } = this.state;
    console.log(error);

    return (
      <section className="App">
        <Searchbar onSubimt={this.handlerSearchbar} />
        {loading && <Loader />}
        {dataImages.length > 0 && (
          <ImageGallery setLargeImageUrl={this.setLargeImageUrl}>
            <ImageGalleryItem dataImages={dataImages} />
          </ImageGallery>
        )}
        {dataImages.length > 0 && <Button onClick={this.handlerFetch} />}
        {largeImageUrl && !showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageUrl={largeImageUrl}
          ></Modal>
        )}
      </section>
    );
  }
}
