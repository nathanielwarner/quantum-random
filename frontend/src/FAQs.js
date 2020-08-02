import React from 'react';

import './FAQs.css';

function FAQs(props) {
  return (
    <div className="FAQs">
      <h2>FAQs</h2>
      <ul>
        <li>
          <h3>How does this work?</h3>
          <p>
            When you flip the coin, a request is made to the <a href="http://qrng.anu.edu.au/index.php" target="_blank" rel="noopener noreferrer">ANU Quantum Random Number Generator</a>, which provides 
            random bytes that are generated from measurement of quantum vacuum fluctuations.
            The outcome of this measurement determines the result of the coin flip.
          </p>
        </li>
        <li>
          <h3>Is this a "universe splitter"?</h3>
          <p>
            This app works the same way as the classic Universe Splitter, <a href="https://apps.apple.com/us/app/universe-splitter/id329233299" target="_blank" rel="noopener noreferrer">available on the iOS App Store</a>.
            I am not affiliated with them.
          </p>
        </li>
        <li>
          <h3>Ok, but does this actually split the universe?</h3>
          <p>Maybe. Scientists aren't sure yet, but it's a real possibility.</p>
          <p>
            Before a measurement is made, a quantum system is generally in a superposition of states,
            meaning that it is in more than one state at once. This superposition is described by the
            wave function, which evolves over time according to the Schrödinger equation.
            When a measurement is made (as happens when using this app), the wave function appears to collapse
            instantaneously and irreversibly.
          </p>
          <p>
            Scientists don't know whether this apparent collapse of the wave function is objectively real,
            because no physical mechanism for it has been uncovered yet. The many-worlds interpretation of quantum mechanics
            argues that the wave function never collapses. Instead, it appears to collapse because we become entangled with 
            the quantum system, so there are now two versions of us out there, one for each outcome.
            You can read more about many-worlds on the&nbsp;
            <a href="https://en.wikipedia.org/wiki/Many-worlds_interpretation" target="_blank" rel="noopener noreferrer">Wikipedia page</a>.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default FAQs;
