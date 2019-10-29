import React from 'react';

import oops from "@assets/oops.png";

// catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        Raven.captureException(error, { extra: errorInfo });
    }

    render() {
        if (this.state.error) {
            //render fallback UI
            return (
                <div className="snap" onClick={() => Raven.lastEventId() && Raven.showReportDialog()}>
                    <img src={oops} />
                    <p>We're sorry — something's gone wrong.</p>
                    <p>Our team has been notified, but click here fill out a report.</p>
                </div>
            );
        } else {
            //when there's not an error, render children untouched
            return this.props.children;
        }
    }
}

export default ErrorBoundary;
