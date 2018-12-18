/**
 * @Author: JoseMunoz
 * @Date:   2018-12-13T13:04:04-06:00
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-12-13T14:13:49-06:00
 */
import React from 'react';
import paths from './paths';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

const Honduras = ({
  fill,
  size,
  stroke,
  onClick,
  onMouseOver,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => (
  <div {...props}>
    <svg
      width={size}
      height={size && size * 0.73}
      viewBox="0 100 710 430"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
    {
      Object.entries(paths).map(([key, path]) => {
        const name = startCase(key);
        const seed = Math.round(Math.random() * (10 ** 10), 0);

        return (
          <path
            id={key}
            d={path}
            fill={fill}
            name={name}
            stroke={stroke}
            onClick={onClick}
            key={`${key}_${seed}`}
            onMouseOver={onMouseOver}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        );
      })
    }
    </svg>
  </div>
);

Honduras.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

Honduras.defaultProps = {
  size: null,
  fill: '#38C298',
  stroke: '#000000',
  onClick: null,
  onMouseOver: null,
  onMouseEnter: null,
  onMouseLeave: null,
};

export default Honduras;
