<template>
  <div>
    <hooper :settings="settings">
      <slide v-for="(slider, i) in transformedSliderContent" :key="i">
        <div
          class="swiper-slide section slider-area fullscreen-slider fullscreen d-flex align-items-center bg_image award-content"
          :style="{ backgroundImage: 'url(' + slider.src + ')' }"
        >
          <v-container>
            <v-row class="d-flex fullscreen" align="center">
              <v-col cols="12">
                <div class="content text-center">
                  <h2>{{ slider.judul }}</h2>
                  <v-row>
                    <v-col
                      sm="12"
                      xs="12"
                      v-for="(item, i) in slider.jadwal"
                      :key="i"
                      class="my-3"
                    >
                      <v-card>
                        <div class="d-flex flex-no-wrap justify-space-between">
                          <div>
                            <v-card-title class="text-left">
                              {{ item.dokter }}
                            </v-card-title>
                            <v-card-subtitle class="text-left mt-7 text-h4">{{
                              item.jam
                            }}</v-card-subtitle>
                          </div>

                          <v-avatar class="ma-3" rounded="0" size="125">
                            <v-img
                              src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
                            ></v-img>
                          </v-avatar>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
        <!-- End Hero Area -->
      </slide>
      <hooper-pagination slot="hooper-addons"></hooper-pagination>
    </hooper>
  </div>
</template>

<script>
import { Hooper, Slide, Pagination as HooperPagination } from "hooper";
import axios from "axios";

export default {
  components: {
    Hooper,
    Slide,
    HooperPagination,
  },
  data() {
    return {
      sliderContent: [
        {
          judul: "Poli Gigi",
          jadwal: [
            {
              dokter: "dr. DETTY NUR IRAWATI Sp.PD,, FINASIM",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "dr. Hj. DARIROH, Sp.A",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "dr. ANDI BUDI HERIANTO SpOG",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "dr. CITRA GANESHA PUTRI, SpA",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "dr. RUSDI,Sp.B FINACS",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "dr. RODIYAH Sp.OG",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "Dr dr. H. MUHAMMAD HAMDAN Sp.S (K)",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "dr. LAILY IRFANA Sp.S",
              jam: "08:00 - 10:00",
            },
          ],
        },
        {
          judul: "Poli THT",
          jadwal: [
            {
              dokter: "dr. ARGIRINA GHASSANISp.N",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "dr. MOCH WACHID Sp.THT-KL",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "dr. DIANA TRI RATNASARI Sp.KK FINSDV",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "drg. NABIL AGENG DWIPUTRA",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "dr. ZULKARNAIN Sp.OT (K)",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "drg PRINANTININGSIH",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "dr. Hj. BOEDY WIDYANINGSIH, Sp.M",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "dr. KHOLID YUSUF Sp.THT-KL",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "dr. H. MOHAMMAD SUBKHAN Sp.P, MM",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "dr. H. HADI HARTONO Sp.JP (K) FIHA",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "dr. SHIDQYSp.U, M.Ked.Klin",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "dr. SILAHUDINSp.KFR",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "dr. ARDHITO RACHMAN, Sp.U",
              jam: "08:00 - 10:00",
            },
            {
              dokter: "DR.. MAHRUS A. RAHMAN dr., SpA (K)",
              jam: "08:00 - 10:00",
            },
          ],
        },
      ],
      settings: {
        vertical: true,
        mouseDrag: false,
        infiniteScroll: true,
        hoverPause: false,
        transition: 1600,
        autoPlay: true,
        playSpeed: 15000,
      },
      transformedSliderContent: {},
      dataApi: null,
    };
  },
  methods: {
    fetchData() {
      axios
        .get(
          "http://10.126.0.1/api/api/doctor_schedule_today/f/?key=1234576890"
        )
        .then((response) => {
          this.dataApi = response;
          this.transformData();
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });
    },
    transformData() {
      let dataUnit = [];
      //let dataDokter = this.dataApi.data.data;
      let dataUnitDokter = this.dataApi.data.data.map((item) => ({
        unit_name: item.unit_name,
        doctor_name: item.doctor_name,
      }));
      for (let i = 0; i < this.dataApi.data.data.length; i++) {
        dataUnit[i] = this.dataApi.data.data[i].unit_name;
      }
      dataUnit = [...new Set(dataUnit)];
      // for (let i = 0; i < this.dataDokter.length; i++) {
      //   if (dataDokter[i])
      // }
      console.log(dataUnit);
      console.log(dataUnitDokter);
    },
    transformSliderContent() {
      const data = this.sliderContent;
      const maxContentPerSlide = 4;
      let dataPoli = {};
      let jumlahJadwalPoli = {};
      let newSliderContent = [];

      for (let i = 0; i < data.length; i++) {
        dataPoli[i] = data[i].judul;
        jumlahJadwalPoli[i] = data[i].jadwal.length;

        if (jumlahJadwalPoli[i] > maxContentPerSlide) {
          let jumlahSlide = Math.ceil(jumlahJadwalPoli[i] / maxContentPerSlide);

          for (let j = 0; j < jumlahSlide; j++) {
            let startIndex = j * maxContentPerSlide;
            let endIndex = (j + 1) * maxContentPerSlide;
            let slicedJadwal = data[i].jadwal.slice(startIndex, endIndex);

            newSliderContent.push({
              judul: dataPoli[i],
              jadwal: slicedJadwal,
            });
          }
        } else {
          newSliderContent.push({
            judul: dataPoli[i],
            jadwal: data[i].jadwal,
          });
        }
      }
      this.transformedSliderContent = newSliderContent;
    },
  },
  mounted() {
    this.transformSliderContent();
    this.fetchData();
  },
};
</script>

<style scoped></style>
