const Miners = ({ title, src }: { title: string, src: string }) =>
   <div className="main-container">
     <iframe
        title={title}
        width="100%"
        height="1200"
        src={src}
     ></iframe>
   </div>;

export default Miners;
