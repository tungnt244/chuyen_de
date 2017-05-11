export var paraData = `hello there, what should i do now don't know
                    `
export var timer = 10;

export var code = [{
    para: `export default function withFoo(WrappedComponent) {
  return function WithFoo(props) {
    return <WrappedComponent {...props} foo />;
  }
}

// good
export default function withFoo(WrappedComponent) {
  function WithFoo(props) {
    return <WrappedComponent {...props} foo />;
  }

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  WithFoo.displayName = hello;
  return WithFoo;
}`,
    timer: 100
},{
    para: `// bad
export default React.createClass({
  displayName: 'ReservationCard',
  // stuff goes here
});

// good
export default class ReservationCard extends React.Component {
}`,
    timer:100
}]
export var data =[{
    para: `hello there, what should i do now don't know
                    `,
    timer: 15
},{
    para: `Campaigners say over the years, thousands of women, especially those from poor families, have been discarded by their husbands, many have been rendered destitute with nowhere to go and many have been forced to return to their parental homes or fend for themselves
                    `,
    timer: 30
},{
    para: `The 35-year-old mother of two was visiting her parents' home in the northern state of Uttarakhand for medical treatment in October 2015 when she received a letter from her husband telling her that he was divorcing her.
                    `,
    timer: 30
},{
    para: `Islamic scholars say the Koran clearly spells out how to issue a divorce - it has to be spread over three months which allows a couple time for reflection and reconciliation
                    `,
    timer: 30
},{
    para: `In recent years, many Muslim men in India have told their wives they are divorcing them - by letter or telephone, and even by text message
                    `,
    timer: 30
}]