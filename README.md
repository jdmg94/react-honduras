# React-Honduras

an SVG based map of Honduras as a React component.

## Installation

`yarn add react-honduras`

or

`npm install react-honduras`

## Usage

```jsx	
	<Honduras
		size={500}
		fill="white"
		stroke="black"
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
```

Made by José Muñoz