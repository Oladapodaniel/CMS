<script setup>
import JurrasicIcon from "../../../assets/ecommerce/jurrasic.png";
import ShoppingCart from "../../../assets/ecommerce/ShoppingCart.svg";
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
import axios from "@/gateway/backendapi";
import router from "../../../router";
import ProductCard from "./component/ProductCard.vue";
import ProductOneIcon from "../../../assets/ecommerce/Temps.png";

const searchQuery = ref("");

const getAllProduct = async () => {
  try {
    const { data } = await axios.get("/api/Ecommerce/GetAllProducts");
    console.log(data, "hhh");
  } catch (error) {
    console.log(error);
  }
};
getAllProduct();
const productItem = (item) => {
  console.log(item, '');
  router.push('/store/bookdetails')
  
}
const products = ref([
  {
    id: 1,
    image: ProductOneIcon,
    title: "48 Laws of Power",
    review: "4.5",
    price: "₦3,000,000",
  },
  {
    id: 2,
    image: ProductOneIcon,
    title: "48 Laws of Power",
    review: "4.5",
    price: "₦3,000,000",
  },
  {
    id: 3,
    image: ProductOneIcon,
    title: "48 Laws of Power",
    review: "4.5",
    price: "₦3,000,000",
  },
  {
    id: 4,
    image: ProductOneIcon,
    title: "48 Laws of Power",
    review: "4.5 stars",
    price: "₦3,000,000",
  },
  {
    id: 5,
    image: ProductOneIcon,
    title: "48 Laws of Power",
    review: "4.5 stars",
    price: "₦3,000,000",
  },
  {
    id: 6,
    image: ProductOneIcon,
    title: "48 Laws of Power",
    review: "4.5 stars",
    price: "₦3,000,000",
  },
  {
    id: 7,
    image: ProductOneIcon,
    title: "48 Laws of Power",
    review: "4.5 stars",
    price: "₦3,000,000",
  },
  {
    id: 8,
    image: ProductOneIcon,
    title: "48 Laws of Power",
    review: "4.5 stars",
    price: "₦3,000,000",
  },
]);
</script>
<template>
  <section
    class="hero-section d-flex align-items-center justify-content-between py-5"
    style="background-color: #3b1850"
  >
    <div class="container-slim">
      <div class="row align-items-center mb-4">
        <div class="col-md-12 d-flex justify-content-center">
          <div class="col-md-6 ml-3">
            <el-input
              class="w-100 rounded-border"
              :suffix-icon="Search"
              placeholder="Search items product & services"
              v-model="searchQuery"
              size="large"
            />
          </div>
        </div>
      </div>
      <div class="row align-items-center justify-content-between">
        <div class="col-md-6 text-white">
          <h1 class="display-4 fw-500">
            Enjoy <span class="text-warning font-weight-bold">25% Discount</span> on all
            shirts
          </h1>
          <p>Offer Valid till 31st July, 2024</p>
          <el-button round size="large" color="#FF5906" class="text-white"
            ><img class="cart-icon" :src="ShoppingCart" alt="" /> Start
            shopping</el-button
          >
        </div>
        <div class="col-md-5 text-center">
          <img :src="JurrasicIcon" class="img-fluid" alt="Discount Image" />
        </div>
      </div>
    </div>
  </section>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-md-12 mt-4 p-5 bg-gray-500 border-radius-8">
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-9 d-flex flex-wrap justify-content-between">
                  <div>Business</div>
                  <div>Corporate</div>
                  <div>Investment</div>
                  <div>Ecommerce</div>
                </div>
              </div>
            </div>
            <div class="col-md-3" v-for="product in products" :key="product.id">
              <div class="cursor-pointer" @click="productItem(product)">
                <ProductCard
                :image="product.image"
                :title="product.title"
                :review="product.review"
                :price="product.price"
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.hero-section {
  background: linear-gradient(90deg, #12091c 0%, #542a82 100%);
  color: white;
}
.hero-section .text-warning {
  color: #ffb800;
}

.hero-section img {
  max-width: 100%;
  height: auto;
}
.cart-icon {
  transform: rotate(0deg);
  align-items: right;
}
</style>
