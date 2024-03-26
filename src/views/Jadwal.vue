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
                  <h2>{{ slider.unit_name }}</h2>
                  <v-row>
                    <v-col
                      sm="12"
                      xs="12"
                      v-for="(item, j) in slider.jadwal"
                      :key="j"
                      class="my-3"
                    >
                      <v-card>
                        <div class="d-flex flex-no-wrap justify-space-between">
                          <div>
                            <v-card-title class="text-left">
                              {{ item.doctor }}
                            </v-card-title>
                            <v-card-subtitle class="text-left mt-7 text-h4"
                              >{{ item.start }} -
                              {{ item.end }}</v-card-subtitle
                            >
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
    </hooper>
  </div>
</template>

<script>
import { Hooper, Slide } from "hooper";
import axios from "axios";

export default {
  components: {
    Hooper,
    Slide,
  },
  data() {
    return {
      settings: {
        vertical: true,
        mouseDrag: false,
        infiniteScroll: true,
        hoverPause: false,
        transition: 100,
        autoPlay: true,
        playSpeed: 15000,
      },
      transformedSliderContent: [],
    };
  },
  methods: {
    fetchData() {
      axios
        .get(
          "http://10.126.0.1/api/api/doctor_schedule_today/t/?key=1234576890"
        )
        .then((response) => {
          this.transformData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });
    },
    transformData(data) {
      const unitsMap = {};
      const transformedData = [];

      data.forEach((schedule) => {
        const unitId = schedule.unit_id;
        if (!unitsMap[unitId]) {
          unitsMap[unitId] = {
            unit_name: schedule.unit_name,
            jadwal: [],
          };
        }

        unitsMap[unitId].jadwal.push({
          doctor_id: schedule.doctor_id,
          doctor: schedule.doctor_name,
          start: schedule.starts,
          end: schedule.ends,
        });
      });

      Object.values(unitsMap).forEach((unit) => {
        const jadwalChunks = [];
        for (let i = 0; i < unit.jadwal.length; i += 2) {
          jadwalChunks.push(unit.jadwal.slice(i, i + 2));
        }

        jadwalChunks.forEach((chunk, index) => {
          if (index === 0) {
            transformedData.push({
              unit_name: unit.unit_name,
              jadwal: chunk,
            });
          } else {
            transformedData.push({
              unit_name: unit.unit_name + ` (Lanjutan)`,
              jadwal: chunk,
            });
          }
        });
      });

      this.transformedSliderContent = transformedData;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped></style>
