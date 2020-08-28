import React from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../store/getArticles/actions';

import 'antd/dist/antd.css';

const style = {
  margin: 'auto',
};
const PaginationPanel = ({ GET_ARTICLES_FETCH, token }) => {
  const onChange = (el) => {
    GET_ARTICLES_FETCH(el, token);
  };

  return (
    <div className="pagination-wrapper" style={style}>
      <Pagination defaultCurrent={1} total={500} pageSize={5} onChange={onChange} showSizeChanger={false}/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPage: state.paginationReducer.currentPage,
    totalPage: state.paginationReducer.totalPage,
    token: state.userSignControlReducer.user.token
  };
};

export default connect(mapStateToProps, actions)(PaginationPanel);
