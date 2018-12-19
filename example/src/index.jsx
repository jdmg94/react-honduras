/**
 * @Author: JoseMunoz
 * @Date:   2018-12-17T10:07:37-06:00
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-12-17T11:51:58-06:00
 */
import Honduras from '../../lib';
import { hydrate } from 'react-dom';
import React, { Fragment } from 'react';
import { useSpring, animated, config } from 'react-spring/hooks';
import { Inspector, useRangeKnob, useColorKnob } from 'retoggle';
import { Layout, Grid, Menu, Header, Message, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const { Row, Column } = Grid;
const fadeIn = {
  initial: {
    opacity: 0,
  },
  result: {
    opacity: 1,
  }
};

const fadeUpAndIn = {
  result: {
    ...fadeIn.result,
    transform: 'translateY(0)',
  },
  initial: {
    ...fadeIn.initial,
    transform: 'translateY(10rem)',
  }
};

const fadeDownAndIn = {
  result: {
    ...fadeIn.result,
    transform: 'translateY(0)',
  },
  initial: {
    ...fadeIn.initial,
    transform: 'translateY(-10rem)',
  }
};

const AnimatedMap = () => {
  const [fill] = useColorKnob('fill', 'rgba(54, 249, 255, 0.2)');
  const [stroke] = useColorKnob('stroke', '#2160CC');
  const [fillOnHover] = useColorKnob('onMouseOver: fill', 'rgb(35, 116, 99)');
  const [strokeOnHover] = useColorKnob('onMouseOver: stroke', 'white');
  const [size] = useRangeKnob('size', {
    initialValue: 600,
    min: 50,
    max: 5000,
  });

  const animation = useSpring({
    native: true,
    ...fadeUpAndIn.result,
    config: config.molasses,
    from: fadeUpAndIn.initial,
  });

  const replaceStrokeAndFill = newValues => ({
    target: { attributes }
  }) => {
    attributes.fill.value = newValues.fill;
    attributes.stroke.value = newValues.stroke;
  };

  return (
    <animated.div style={animation}>
      <Honduras
        size={size}
        fill={fill}
        stroke={stroke}
        onClick={({ target }) => {

          alert(target.attributes.name.value);
        }}
        onMouseOver={replaceStrokeAndFill({
          fill: fillOnHover,
          stroke: strokeOnHover,
        })}

        onMouseLeave={replaceStrokeAndFill({
          fill,
          stroke,
        })}
      />
    </animated.div>
  );
};

const AnimatedTitle = () => {
  const animation = useSpring({
    native: true,
    transform: 'scale(1)',
    from: {
      transform: 'scale(4)',
    }
  });

  return (
    <animated.div
      style={animation}
    >
      <Header
        as="h1"
        size="huge"
      >
        Hello
        {' '}
        from
        {' '}
        Honduras!
      </Header>
    </animated.div>
  );
};

const AnimatedMessage = () => {
  const animation = useSpring({
    native: true,
    config: config.slow,
    ...fadeDownAndIn.result,
    from: fadeDownAndIn.initial,
  });

  return (
    <animated.div style={animation}>
      <Message
        size="huge"
        color="blue"
      >
        React-Honduras is an SVG map of the country of Honduras, built using React JS
      </Message>
    </animated.div>
  );
};

const Navigation = () => {
  const animation = useSpring({
    native: true,
    ...fadeIn.result,
    config: config.slow,
    from: fadeIn.initial,
  });

  return (
    <animated.div style={animation}>
      <Menu
        pointing
        secondary
        color="blue"
      >
        <Menu.Menu
          icon="labeled"
          position="left"
        >
          <Menu.Item active>
            Demo
          </Menu.Item>

          <Menu.Item
            as="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/jdmg94/react-honduras"
          >
            <Icon
              name="github"
            />
            Repo
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </animated.div>
  );
};

const RowItem = ({ children }) => (
  <Row centered>
    <Column
      mobile={16}
      computer={10}
      textAlign="center"
    >
    {children}
    </Column>
  </Row>
);

const Demo = () => (
  <Fragment>
    <Navigation />
    <Inspector />
    <Grid>
      <RowItem>
        <AnimatedMap />
      </RowItem>
      <RowItem>
        <AnimatedTitle />
      </RowItem>
      <RowItem>
        <AnimatedMessage />
      </RowItem>
    </Grid>
  </Fragment>
);

hydrate(<Demo />, document.getElementById('root'));
