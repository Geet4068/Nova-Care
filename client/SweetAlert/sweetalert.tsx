import SweetAlert from "react-bootstrap-sweetalert";

function SweetAlertComponent({ confirm, cancel, title, subtitle, type }: {
  confirm: any;
  cancel: any;
  title: string;
  subtitle: string;
  type: any;
}): React.JSX.Element {
  return (
    <SweetAlert
      style={{ 
        zIndex: "1",
        backgroundColor: '#fff',
        borderRadius: '15px',
        padding: '20px'
      }}
      title={
        <div>
          <h4>{title}</h4>
          <p style={{ fontSize: '16px', color: '#6F8BA4', marginTop: '10px' }}>{subtitle}</p>
        </div>
      }
      onConfirm={confirm}
      type={type !== undefined ? type : "danger"}
      showCancel={false}
      confirmBtnText="Cancel appointment"
      confirmBtnStyle={{ 
        backgroundColor: '#e12454',
        color: '#fff',
        borderRadius: '5px',
        padding: '10px 25px',
        border: 'none'
      }}
      onCancel={cancel}
      input
      inputPlaceholder="Enter your reason here"
      showCloseButton
      closeOnClickOutside
    />
  );
}

export default SweetAlertComponent;