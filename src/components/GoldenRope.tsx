import React from 'react';

interface GoldenRopeProps {
  ropeRef: React.RefObject<HTMLDivElement | null>;
  style?: React.CSSProperties;
}

const ropeGrad = `
  repeating-linear-gradient(
    -45deg,
    #D4AF37 0px,
    #D4AF37 4px,
    #8a6d1c 4px,
    #8a6d1c 7px,
    #fff7b0 7px,
    #fff7b0 9px
  )
`;

const GoldenRope: React.FC<GoldenRopeProps> = ({ ropeRef, style }) => {
  return (
    <div 
      ref={ropeRef}
      style={{
        position: 'absolute',
        top: '-10px',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        filter: 'drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.5))',
        ...style
      }}
    >
      <div className="rope-scaler">
        {/* Kinematic Chain for real rope physics (3 segments) */}
        <div 
          className="rope-seg-1"
        style={{
          width: '8px', height: '16vh', background: ropeGrad,
          borderRadius: '4px', transformOrigin: 'top center',
          boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.4), inset -1px 0 3px rgba(255,255,255,0.5)'
        }}
      >
        <div 
          className="rope-seg-2"
          style={{
            width: '8px', height: '16vh', background: ropeGrad,
            borderRadius: '4px', transformOrigin: 'top center',
            position: 'absolute', top: '15vh', left: 0,
            boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.4), inset -1px 0 3px rgba(255,255,255,0.5)'
          }}
        >
          <div 
            className="rope-seg-3"
            style={{
              width: '8px', height: '16vh', background: ropeGrad,
              borderRadius: '4px', transformOrigin: 'top center',
              position: 'absolute', top: '15vh', left: 0,
              boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.4), inset -1px 0 3px rgba(255,255,255,0.5)'
            }}
          >
            {/* Knot and Tassel at the very bottom of the chain */}
            <div style={{ position: 'absolute', top: '15vh', left: '-14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Decorative Knot */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, #fff7b0, #D4AF37, #8a6d1c)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.4), inset -2px -2px 6px rgba(0,0,0,0.4)',
                marginBottom: '-5px',
                zIndex: 2,
              }} />
              
              {/* Tassel Base */}
              <div style={{
                width: '22px',
                height: '16px',
                background: 'linear-gradient(90deg, #8a6d1c, #D4AF37, #8a6d1c)',
                borderRadius: '2px',
                zIndex: 1,
              }} />

              {/* Tassel Threads */}
              <div style={{
                width: '36px',
                height: '65px',
                background: 'repeating-linear-gradient(90deg, #D4AF37 0px, #b8860b 2px, #fff7b0 4px)',
                borderRadius: '0 0 12px 12px',
                clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0 100%)',
                boxShadow: '0 5px 15px rgba(0,0,0,0.4)'
              }} />
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default GoldenRope;
      

