import React from 'react';

const Pagination = (props) => {

    const { onLeftClick, onRightClick, page, totalPages } = props;

    return (
        <div className="pagination">
            <button onClick={onLeftClick}>
                <div>Prev</div>
            </button>
            <div>
                {page} de {totalPages}
            </div>
            <button onClick={onRightClick}>
                <div>Next</div>
            </button>
        </div>
    );
}

export default Pagination;
