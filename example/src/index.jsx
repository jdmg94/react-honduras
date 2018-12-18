/**
 * @Author: JoseMunoz
 * @Date:   2018-12-17T10:07:37-06:00
 * @Last modified by:   JoseMunoz
 * @Last modified time: 2018-12-17T11:51:58-06:00
 */
import Honduras from '../../lib';
import { hydrate } from 'react-dom';
import { Spring } from 'react-spring';
import React, { Fragment } from 'react';
import { Inspector, useRangeKnob, useColorKnob } from 'retoggle';
import { Layout, Grid, Menu, Header, Message, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const { Row, Column } = Grid;
const fadeUpAndIn = {
  result: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  initial: {
    opacity: 0,
    transform: 'translateY(10rem)',
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
    max: 1500,
  });

  return (
    <Spring
      from={fadeUpAndIn.initial}
      to={fadeUpAndIn.result}
    >
      {
        animation => (
          <Honduras
            size={size}
            fill={fill}
            stroke={stroke}
            style={animation}
            onClick={({ target }) => {

              alert(target.attributes.name.value);
            }}
            onMouseOver={({ target }) => {
              const { attributes } = target;

              attributes.stroke.value = strokeOnHover;
              attributes.fill.value = fillOnHover;
            }}

            onMouseLeave={({ target }) => {
              const { attributes } = target;

              attributes.stroke.value = stroke;
              attributes.fill.value = fill;
            }}
          />
        )
      }
    </Spring>
  );
};

const AnimatedMessage = () => (
  <Spring
    from={{ opacity: 0 }}
    to={{ opacity: 1 }}
  >
  {
    animation => (
      <Message
        size="huge"
        color="blue"
        style={animation}
      >
      React-Honduras is an SVG map of the country of Honduras, built using React JS
      </Message>
    )
  }
  </Spring>
);

const Navigation = () => (
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
)

const Demo = () => (
  <Fragment>
    <Navigation />
    <Grid>
      <Row centered>
        <Column
          mobile={16}
          computer={10}
          textAlign="center"
        >
          <AnimatedMap />
        </Column>
      </Row>
      <Row>
        <Inspector />
      </Row>
      <Row centered>
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
      </Row>
      <Row centered>
        <AnimatedMessage />
      </Row>
    </Grid>
  </Fragment>
);

hydrate(<Demo />, document.getElementById('root'));
