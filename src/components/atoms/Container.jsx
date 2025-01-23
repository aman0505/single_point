import classNames from 'classnames';

function Container({ children, className, ...props }) {
  return (
    <div
      {...props}
      className={classNames({
        [className]: true,
        'max-w-[1168px] w-full mx-auto': true,
      })}
    >
      {children}
    </div>

  );
}

export default Container;
