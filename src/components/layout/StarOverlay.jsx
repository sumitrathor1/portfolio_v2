import React from 'react';

export default function StarOverlay() {
  return (
    <>
      {/* Falling stars background */}
      <div className="stars" aria-hidden="true">
        <div className="star" style={{ left: '5%', animationDuration: '9s', animationDelay: '0s', width: '2px', height: '2px' }} />
        <div className="star" style={{ left: '15%', animationDuration: '11s', animationDelay: '2s', width: '4px', height: '4px' }} />
        <div className="star" style={{ left: '25%', animationDuration: '13s', animationDelay: '1s', width: '3px', height: '3px' }} />
        <div className="star" style={{ left: '35%', animationDuration: '10s', animationDelay: '3s', width: '2px', height: '2px' }} />
        <div className="star" style={{ left: '45%', animationDuration: '12s', animationDelay: '4s', width: '5px', height: '5px' }} />
        <div className="star" style={{ left: '55%', animationDuration: '8s', animationDelay: '1s', width: '3px', height: '3px' }} />
        <div className="star" style={{ left: '65%', animationDuration: '14s', animationDelay: '2.5s', width: '2px', height: '2px' }} />
        <div className="star" style={{ left: '75%', animationDuration: '9s', animationDelay: '0.5s', width: '6px', height: '6px' }} />
        <div className="star" style={{ left: '85%', animationDuration: '10s', animationDelay: '3s', width: '4px', height: '4px' }} />
        <div className="star" style={{ left: '95%', animationDuration: '7s', animationDelay: '1s', width: '3px', height: '3px' }} />
      </div>

      {/* Shooting stars */}
      <div className="shooting-stars" aria-hidden="true">
        <div className="shooting-star" style={{ '--top': '90%', '--left': '-10%', '--length': '80px', '--duration': '10s', '--delay': '1s' }} />
        <div className="shooting-star" style={{ '--top': '10%', '--left': '-10%', '--length': '10px', '--duration': '20s', '--delay': '0s' }} />
        <div className="shooting-star" style={{ '--top': '30%', '--left': '-10%', '--length': '50px', '--duration': '20s', '--delay': '0s' }} />
        <div className="shooting-star" style={{ '--top': '195%', '--left': '-5%', '--length': '120px', '--duration': '18s', '--delay': '2s' }} />
        <div className="shooting-star" style={{ '--top': '285%', '--left': '-15%', '--length': '100px', '--duration': '15.5s', '--delay': '1s' }} />
        <div className="shooting-star" style={{ '--top': '12%', '--left': '-20%', '--length': '60px', '--duration': '17s', '--delay': '3s' }} />
        <div className="shooting-star" style={{ '--top': '288%', '--left': '-8%', '--length': '90px', '--duration': '14.5s', '--delay': '1.5s' }} />
        <div className="shooting-star" style={{ '--top': '388%', '--left': '-8%', '--length': '70px', '--duration': '14.5s', '--delay': '1s' }} />
        <div className="shooting-star" style={{ '--top': '188%', '--left': '-8%', '--length': '45px', '--duration': '14.5s', '--delay': '5s' }} />
        <div className="shooting-star" style={{ '--top': '188%', '--left': '-8%', '--length': '50px', '--duration': '14.5s', '--delay': '3s' }} />
      </div>
    </>
  );
}
