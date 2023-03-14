import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

export default function Paginater({onPageChanged, _page = 1, _pagesize = 20, totalItem=1}) {
    const totalPages = totalItem < _pagesize ? 1 : Math.ceil(totalItem / _pagesize);
    return <>
        <Pagination className="justify-content-center">
            <Pagination.First disabled={_page === 1} onClick={() => onPageChanged({ _page: 1, _pagesize })} />
            <Pagination.Prev disabled={_page === 1} onClick={() => onPageChanged({ _page: _page - 1, _pagesize })} />

            {_page - 5 > 1 && <Pagination.Ellipsis onClick={() => onPageChanged({ _page: _page - 5, _pagesize })} />}

            {_page - 2 > 0 && <Pagination.Item onClick={() => onPageChanged({ _page: _page - 2, _pagesize })} >{_page - 2}</Pagination.Item>}
            {_page - 1 > 0 && <Pagination.Item onClick={() => onPageChanged({ _page: _page - 1, _pagesize })} >{_page - 1}</Pagination.Item>}
            <Pagination.Item active>{_page}</Pagination.Item>
            {_page + 1 <= totalPages && <Pagination.Item onClick={() => onPageChanged({ _page: _page + 1, _pagesize })}>{_page + 1}</Pagination.Item>}
            {_page + 2 <= totalPages && <Pagination.Item onClick={() => onPageChanged({ _page: _page + 2, _pagesize })}>{_page + 2}</Pagination.Item>}

            {_page + 5 < totalPages && <Pagination.Ellipsis onClick={() => onPageChanged({ _page: _page + 5, _pagesize })} />}

            <Pagination.Next disabled={_page === totalPages} onClick={() => onPageChanged({ _page: _page + 1, _pagesize })} />
            <Pagination.Last disabled={_page === totalPages} onClick={() => onPageChanged({ _page: totalPages, _pagesize })} />
        </Pagination>
    </>

}