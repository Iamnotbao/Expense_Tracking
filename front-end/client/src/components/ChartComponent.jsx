import React from "react";
import { Line } from "react-chartjs-2"; // Import Line chart từ react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js"; // Import các thành phần cần thiết từ chart.js

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = () => {
  // Dữ liệu cho biểu đồ Line
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"], // Các tháng
    datasets: [
      {
        label: "My First dataset", // Tiêu đề của dataset
        data: [65, 59, 80, 81, 56, 55, 40], // Dữ liệu hiển thị trên biểu đồ
        borderColor: "rgba(75,192,192,1)", // Màu đường
        backgroundColor: "rgba(75,192,192,0.2)", // Màu nền phía dưới đường
        fill: true, // Điền màu nền phía dưới đường
      },
    ],
  };

  // Các tùy chọn cho biểu đồ
  const options = {
    responsive: true, // Đảm bảo biểu đồ phản hồi với kích thước màn hình
    plugins: {
      legend: {
        position: "top", // Vị trí của legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.raw + " units"; // Tùy chỉnh thông tin tooltip
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true, // Đảm bảo trục x bắt đầu từ 0
      },
      y: {
        beginAtZero: true, // Đảm bảo trục y bắt đầu từ 0
      },
    },
  };

  return (
    <div className="App">
      <h1>Chart.js Example in React</h1>
      <Line data={data} options={options} /> {/* Render biểu đồ Line */}
    </div>
  );
};

export default ChartComponent;
